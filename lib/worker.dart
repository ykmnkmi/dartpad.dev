// ignore_for_file: avoid_print, implementation_imports

import 'dart:async';
import 'dart:js_interop';

import 'package:dartpad/analyzer/dart/analysis/analysis_context.dart';
import 'package:dartpad/analyzer/dart/analysis/analysis_context_collection.dart';
import 'package:dartpad/analyzer/dart/analysis/results.dart';
import 'package:dartpad/analyzer/file_system/file_system.dart';
import 'package:dartpad/analyzer/file_system/memory_file_system.dart';
import 'package:dartpad/analyzer/src/dart/analysis/byte_store.dart';
import 'package:dartpad/analyzer/src/dartdoc/dartdoc_directive_info.dart';
import 'package:dartpad/analyzer/src/services/available_declarations.dart';
import 'package:dartpad/computer/hover.dart';
import 'package:dartpad/editor.dart';
import 'package:dartpad/init/app.dart';
import 'package:dartpad/init/sdk.dart';
import 'package:meta/dart2js.dart';
import 'package:web/web.dart' show MessageEvent;

@JS('onmessage')
external JSFunction onMessage;

@JS()
external JSVoid postMessage(JSAny? message);

@noInline
void postResponse(JSNumber id, {JSBoolean? success, JSAny? data}) {
  postMessage(EditorResponse(id: id, success: success, data: data));
}

Future<void> main() async {
  MemoryResourceProvider provider = MemoryResourceProvider();

  await initSdk(provider);
  await initApp(provider);

  Folder appFolder = provider.getFolder('/app');
  File mainFile = appFolder.getChildAssumingFile('lib/main.dart');

  AnalysisContextCollection collection = AnalysisContextCollection(
    resourceProvider: provider,
    includedPaths: <String>['/app'],
    sdkPath: '/sdk',
  );

  if (collection.contexts.isEmpty) {
    postMessage(null);
  }

  AnalysisContext context = collection.contexts.first;

  MemoryByteStore byteStore = MemoryByteStore();
  DeclarationsTracker tracker = DeclarationsTracker(byteStore, provider);
  tracker.addContext(context);

  DartdocDirectiveInfo dartdocInfo;

  if (tracker.getContext(context) case var declarationContext?) {
    dartdocInfo = declarationContext.dartdocDirectiveInfo;
  } else {
    dartdocInfo = DartdocDirectiveInfo();
  }

  Future<void> editFile(EditData data) async {
    try {
      for (ModelContentChange change in data.changes.toDart) {
        int start = change.offset.toDartInt;
        int end = change.end.toDartInt;

        String content = mainFile.readAsStringSync().replaceRange(start, end, change.text.toDart);

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
      SomeResolvedUnitResult unit = await context.currentSession.getResolvedUnit(mainFile.path);

      if (unit is ResolvedUnitResult) {
        DartUnitHoverComputer hoverComputer = DartUnitHoverComputer(
          dartdocInfo,
          unit.unit,
          data.offset.toDartInt,
          preference: DocumentationPreference.summary,
        );

        String? value = hoverComputer.compute();

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

  StreamController<MessageEvent> eventController = StreamController<MessageEvent>();
  onMessage = eventController.add.toJS;
  postMessage(mainFile.readAsStringSync().toJS);

  await for (MessageEvent event in eventController.stream) {
    EditorData data = event.data as EditorData;
    String type = data.type.toDart;

    if (type == 'edit') {
      await editFile(data as EditData);
    } else if (type == 'hover') {
      await provideHover(data as HoverData);
    } else {
      postResponse(data.id);
    }
  }
}
