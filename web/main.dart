// ignore_for_file: avoid_print

import 'dart:html' show HtmlElement, document, window;

// import 'package:analyzer_js/dart/analysis/analysis_context.dart';
// import 'package:analyzer_js/dart/analysis/analysis_context_collection.dart';
// import 'package:analyzer_js/dart/analysis/results.dart';
// import 'package:analyzer_js/dart/ast/ast.dart';
import 'package:analyzer_js/file_system/memory_file_system.dart';
// import 'package:analyzer_js/src/dart/analysis/byte_store.dart';
// import 'package:analyzer_js/src/dartdoc/dartdoc_directive_info.dart';
// import 'package:analyzer_js/src/services/available_declarations.dart';
// import 'package:dartpad/computer/hover.dart';
import 'package:dartpad/dartpad.dart';
import 'package:dartpad/init/app.dart';
// import 'package:dartpad/init/sdk.dart';
import 'package:path/path.dart' as path show posix;

Future<void> main() async {
  var editorElement = document.querySelector('#editor');

  if (editorElement is! HtmlElement) {
    window.alert('#editor HtmlElement not found.');
    return;
  }

  setupEditorWorker();

  var resourceProvider = MemoryResourceProvider(context: path.posix);
  // await initSdk(resourceProvider);
  await initApp(resourceProvider);

  var appFolder = resourceProvider.getFolder('/app');
  var mainFile = appFolder.getChildAssumingFile('lib/main.dart');

  var editorOptions = StandaloneCodeEditorOptions(
    automaticLayout: true,
    language: 'dart',
    scrollBeyondLastLine: false,
    tabSize: 2,
    value: mainFile.readAsStringSync(),
  );

  createEditor(editorElement, editorOptions);

  // var collection = AnalysisContextCollection(
  //   resourceProvider: resourceProvider,
  //   includedPaths: <String>['/app'],
  //   sdkVersion: '3.1.0-262.3.beta',
  //   sdkPath: '/sdk',
  // );

  // if (collection.contexts case [var context, ...]) {
  //   var memoryByteStore = MemoryByteStore();
  //   var declarationsTracker = DeclarationsTracker(memoryByteStore, resourceProvider);
  //   declarationsTracker.addContext(context);

  //   DartdocDirectiveInfo dartdocInfo;

  //   if (declarationsTracker.getContext(context) case var declarationContext?) {
  //     dartdocInfo = declarationContext.dartdocDirectiveInfo;
  //   } else {
  //     dartdocInfo = DartdocDirectiveInfo();
  //   }

  //   Future<void> resolve(AnalysisContext context, String path) async {
  //     var resolvedUnit = await context.currentSession.getResolvedUnit(path);

  //     if (resolvedUnit is ResolvedUnitResult) {
  //       var compilationUnit = resolvedUnit.unit;
  //       getHover(dartdocInfo, compilationUnit, 310, documentationPreference: DocumentationPreference.full);
  //     }
  //   }

  //   await resolve(context, mainFile.path);

  //   // var content = mainFile.readAsStringSync();
  //   // mainFile.writeAsStringSync(content.replaceAll('estimate', 'est'));

  //   // context.changeFile(mainFile.path);
  //   // await context.applyPendingFileChanges();

  //   // await resolve(context, mainFile.path);
  // }
}

// void getHover(
//   DartdocDirectiveInfo dartdocInfo,
//   CompilationUnit compilationUnit,
//   int offset, {
//   DocumentationPreference documentationPreference = DocumentationPreference.none,
// }) {
//   var hoverComputer = DartUnitHoverComputer(
//     dartdocInfo,
//     compilationUnit,
//     offset,
//     documentationPreference: documentationPreference,
//   );

//   var hoverInfo = hoverComputer.compute();
//   print(hoverInfo?.dartdoc);
// }
