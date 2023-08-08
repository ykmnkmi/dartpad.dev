// ignore_for_file: avoid_print

import 'dart:js_interop';

import 'package:analyzer_js/dart/analysis/analysis_context_collection.dart';
import 'package:analyzer_js/dart/analysis/results.dart';
import 'package:analyzer_js/dart/ast/ast.dart';
import 'package:analyzer_js/file_system/memory_file_system.dart';
import 'package:analyzer_js/src/dart/analysis/byte_store.dart';
import 'package:analyzer_js/src/dartdoc/dartdoc_directive_info.dart';
import 'package:analyzer_js/src/services/available_declarations.dart';
import 'package:dartpad/computer/hover.dart';
import 'package:dartpad/dartpad.dart';
import 'package:dartpad/init/app.dart';
import 'package:dartpad/init/sdk.dart';
import 'package:path/path.dart' as path show posix;
import 'package:web/web.dart';

Future<void> main() async {
  var loadingElement = document.querySelector('#loading') as Element;
  var editorElement = document.querySelector('#editor') as Element;

  var resourceProvider = MemoryResourceProvider(context: path.posix);
  await initSdk(resourceProvider);
  await initApp(resourceProvider);

  var appFolder = resourceProvider.getFolder('/app');
  var mainFile = appFolder.getChildAssumingFile('lib/main.dart');

  setupEditorWorker();

  var model = createModel(mainFile.readAsStringSync(), 'dart');

  var editorOptions = StandaloneCodeEditorOptions(
    automaticLayout: true,
    model: model,
    scrollBeyondLastLine: false,
    tabSize: 2,
  );

  createEditor(editorElement, editorOptions);

  var collection = AnalysisContextCollection(
    resourceProvider: resourceProvider,
    includedPaths: <String>['/app'],
    sdkVersion: '3.1.0-262.3.beta',
    sdkPath: '/sdk',
  );

  if (collection.contexts case [var context, ...]) {
    var memoryByteStore = MemoryByteStore();
    var declarationsTracker = DeclarationsTracker(memoryByteStore, resourceProvider);
    declarationsTracker.addContext(context);

    DartdocDirectiveInfo dartdocInfo;

    if (declarationsTracker.getContext(context) case var declarationContext?) {
      dartdocInfo = declarationContext.dartdocDirectiveInfo;
    } else {
      dartdocInfo = DartdocDirectiveInfo();
    }

    void onDidChangeContent(ModelContentChangedEvent event) {
      if (event.changes.isEmpty) {
        return;
      }

      mainFile.writeAsStringSync(model.getValue());
      context.changeFile(mainFile.path);
      context.applyPendingFileChanges();
    }

    model.onDidChangeContent(onDidChangeContent);

    Future<Hover?> provideHover(
      TextModel model,
      Position position,
      CancellationToken token,
    ) async {
      var resolvedUnit = await context.currentSession.getResolvedUnit(mainFile.path);

      if (resolvedUnit is ResolvedUnitResult) {
        if (resolvedUnit.errors case [var first, ...]) {
          console.error(first.message.toJS);
          return null;
        }

        var compilationUnit = resolvedUnit.unit;

        var hover = getHover(
          dartdocInfo,
          compilationUnit,
          model.getOffsetAt(position),
          documentationPreference: DocumentationPreference.full,
        );

        if (token.isCancellationRequested || hover == null) {
          return null;
        }

        return Hover(contents: <MarkdownString>[
          MarkdownString(value: hover),
        ]);
      }

      return null;
    }

    enableDartLanguageService(provideHover);
  }

  loadingElement.remove();
}

String? getHover(
  DartdocDirectiveInfo dartdocInfo,
  CompilationUnit compilationUnit,
  int offset, {
  DocumentationPreference documentationPreference = DocumentationPreference.none,
}) {
  var hoverComputer = DartUnitHoverComputer(
    dartdocInfo,
    compilationUnit,
    offset,
    documentationPreference: documentationPreference,
  );

  return hoverComputer.compute();
}
