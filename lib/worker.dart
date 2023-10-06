// ignore_for_file: avoid_print, implementation_imports

import 'dart:async';
import 'dart:js_interop';

import 'package:analyzer_js/dart/analysis/analysis_context_collection.dart';
import 'package:analyzer_js/dart/analysis/results.dart';
import 'package:analyzer_js/file_system/memory_file_system.dart';
import 'package:analyzer_js/src/dart/analysis/byte_store.dart';
import 'package:analyzer_js/src/dartdoc/dartdoc_directive_info.dart';
import 'package:analyzer_js/src/services/available_declarations.dart';
import 'package:dartpad/computer/hover.dart';
import 'package:dartpad/dom.dart';
import 'package:dartpad/editor.dart';
import 'package:dartpad/init/app.dart';
import 'package:dartpad/init/sdk.dart';
import 'package:meta/dart2js.dart';
import 'package:path/path.dart' as path show posix;

@JS('onmessage')
external JSFunction onMessage;

@JS()
external JSVoid postMessage(JSAny? message);

@noInline
void postResponse(JSNumber id, {JSBoolean? success, JSAny? data}) {
  postMessage(EditorResponse(id: id, success: success, data: data));
}

Future<void> main() async {
  var provider = MemoryResourceProvider(context: path.posix);
  await initSdk(provider);
  await initApp(provider);

  var appFolder = provider.getFolder('/app');
  var mainFile = appFolder.getChildAssumingFile('lib/main.dart');

  var collection = AnalysisContextCollection(
    resourceProvider: provider,
    includedPaths: <String>['/app'],
    sdkPath: '/sdk',
  );

  if (collection.contexts.isEmpty) {
    postMessage(null);
  }

  var context = collection.contexts.first;

  var byteStore = MemoryByteStore();
  var tracker = DeclarationsTracker(byteStore, provider);
  tracker.addContext(context);

  DartdocDirectiveInfo dartdocInfo;

  if (tracker.getContext(context) case var declarationContext?) {
    dartdocInfo = declarationContext.dartdocDirectiveInfo;
  } else {
    dartdocInfo = DartdocDirectiveInfo();
  }

  Future<void> editFile(EditData data) async {
    try {
      for (var change in data.changes.toDart.cast<ModelContentChange>()) {
        var start = change.offset.toDartInt;
        var end = change.end.toDartInt;

        var content = mainFile
            .readAsStringSync()
            .replaceRange(start, end, change.text.toDart);

        mainFile.writeAsStringSync(content);
        context.changeFile(mainFile.path);
      }

      await context.applyPendingFileChanges();
    } catch (error, trace) {
      print(error);
      print(trace);
    }
  }

  Future<void> provideHover(HoverData data) async {
    try {
      var unit = await context.currentSession.getResolvedUnit(mainFile.path);

      if (unit is ResolvedUnitResult) {
        var hoverComputer = DartUnitHoverComputer(
          dartdocInfo,
          unit.unit,
          data.offset.toDartInt,
          preference: DocumentationPreference.full,
        );

        var value = hoverComputer.compute();

        if (value != null) {
          postResponse(data.id, success: true.toJS, data: value.toJS);
          return;
        }
      }

      postResponse(data.id);
    } catch (error, trace) {
      print(error);
      print(trace);
      postResponse(data.id);
    }
  }

  var eventController = StreamController<MessageEvent>();
  onMessage = eventController.add.toJS;
  postMessage(mainFile.readAsStringSync().toJS);

  await for (var event in eventController.stream) {
    var data = event.data as EditorData;
    var type = data.type.toDart;

    if (type == 'edit') {
      await editFile(data as EditData);
    } else if (type == 'hover') {
      await provideHover(data as HoverData);
    } else {
      postResponse(data.id);
    }
  }
}
