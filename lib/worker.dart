// ignore_for_file: avoid_print, implementation_imports

import 'dart:async';
import 'dart:js_interop';

import 'package:analyzer/dart/analysis/analysis_context.dart';
import 'package:analyzer/dart/analysis/analysis_context_collection.dart';
import 'package:analyzer/dart/analysis/results.dart';
import 'package:analyzer/file_system/memory_file_system.dart';
import 'package:analyzer/src/dart/analysis/driver_based_analysis_context.dart';
import 'package:analyzer/src/dartdoc/dartdoc_directive_info.dart';
import 'package:dartpad/computer/computer_documentation.dart';
import 'package:dartpad/computer/computer_hover.dart';
import 'package:dartpad/computer/hover_information.dart';
import 'package:dartpad/dom.dart';
import 'package:dartpad/editor.dart';
import 'package:dartpad/init/app.dart';
import 'package:dartpad/init/sdk.dart';
import 'package:path/path.dart' as path show posix;

@JS('onmessage')
external JSFunction onMessage;

@JS()
external JSVoid postMessage(JSAny? message);

Future<void> main() async {
  var resourceProvider = MemoryResourceProvider(context: path.posix);
  await initSdk(resourceProvider);
  await initApp(resourceProvider);

  var appFolder = resourceProvider.getFolder('/app');
  var mainFile = appFolder.getChildAssumingFile('lib/main.dart');

  var collection = AnalysisContextCollection(
    resourceProvider: resourceProvider,
    includedPaths: <String>['/app'],
    sdkPath: '/sdk',
  );

  if (collection.contexts.isEmpty) {
    postMessage(null);
  }

  var context = collection.contextFor(mainFile.path);

  DartdocDirectiveInfo dartdocInfo;

  if (context is DriverBasedAnalysisContext) {
    dartdocInfo = context.driver.dartdocDirectiveInfo;
  } else {
    dartdocInfo = DartdocDirectiveInfo();
  }

  // void onDidChangeContent(ModelContentChangedEvent event) {
  //   if (event.changes.isEmpty) {
  //     return;
  //   }

  //   mainFile.writeAsStringSync(model.getValue());
  //   context.changeFile(mainFile.path);
  //   context.applyPendingFileChanges();
  // }

  var eventController = StreamController<MessageEvent>();
  onMessage = eventController.add.toJS;
  postMessage(mainFile.readAsStringSync().toJS);

  await for (var event in eventController.stream) {
    var data = event.data as EditorData;
    var type = data.type.toDart;

    if (type == 'hover') {
      var hoverData = data as HoverData;

      provideHover(
        hoverData.id,
        context,
        dartdocInfo,
        mainFile.path,
        hoverData.offset.toDartInt,
      );
    } else {
      postMessage(EditorResponse(id: data.id));
    }
  }
}

Future<void> provideHover(
  JSNumber id,
  AnalysisContext context,
  DartdocDirectiveInfo dartdocInfo,
  String path,
  int offset,
) async {
  try {
    var resolvedLibrary = await context.currentSession.getResolvedLibrary(path);

    if (resolvedLibrary is ResolvedLibraryResult) {
      var unit = resolvedLibrary.unitWithPath(path);

      if (unit != null) {
        var hoverComputer = DartUnitHoverComputer(
          dartdocInfo,
          unit.unit,
          offset,
          documentationPreference: DocumentationPreference.full,
        );

        var hoverInformation = hoverComputer.compute();

        if (hoverInformation != null) {
          postMessage(
            EditorResponse(
              id: id,
              success: true.toJS,
              data: hoverInformation.toHover(unit.lineInfo),
            ),
          );

          return;
        }
      }
    }

    postMessage(EditorResponse(id: id));
  } catch (error, trace) {
    print(error);
    print(trace);
    postMessage(EditorResponse(id: id));
  }
}
