@JS('dartpad')
library;

import 'dart:html' show HtmlElement;

import 'package:js/js.dart';
import 'package:meta/meta.dart';

@optionalTypeArgs
typedef Listener<T> = void Function(T event);

// editor.api.d.ts

// 32
@JS()
@staticInterop
abstract final class Disposable {}

extension DisposableJS on Disposable {
  @JS()
  external void dispose();
}

// 69
@JS()
@staticInterop
abstract final class CancellationToken {}

extension CancellationTokenJS on CancellationToken {
  @JS()
  external bool get isCancellationRequested;

  @JS('onCancellationRequested')
  external void _onCancellationRequested(Function listener);

  void onCancellationRequested(Listener listener) {
    _onCancellationRequested(allowInterop(listener));
  }
}

// 514
@JS()
@staticInterop
abstract final class Position {}

extension PositionJS on Position {
  @JS()
  external int get lineNumber;

  @JS()
  external int get column;
}

// 1396
@JS()
@staticInterop
abstract final class StandaloneCodeEditor {}

extension StandaloneCodeEditorJS on StandaloneCodeEditor {
  @JS('onDidChangeModelContent')
  external void _onDidChangeModelContent(Function listener);

  void onDidChangeModelContent(Listener<ModelContentChangedEvent> listener) {
    _onDidChangeModelContent(allowInterop(listener));
  }
}

@JS()
@anonymous
abstract final class StandaloneCodeEditorOptions {
  external factory StandaloneCodeEditorOptions({
    bool? automaticLayout,
    String? language,
    EditorMinimapOptions? minimap,
    TextModel? model,
    bool? scrollBeyondLastLine,
    int? tabSize,
    String? value,
  });

  external bool? get automaticLayout;

  external String? get language;

  external EditorMinimapOptions? get minimap;

  external TextModel? get model;

  external bool? get scrollBeyondLastLine;

  external int? get tabSize;

  external String? get value;
}

@JS()
@anonymous
abstract final class EditorMinimapOptions {
  external factory EditorMinimapOptions({
    bool? enabled,
  });

  external bool? get enabled;
}

// 1897
@JS()
@staticInterop
abstract final class TextModel {}

extension TextModelJS on TextModel {
  @JS()
  external String getValue();

  @JS('onDidChangeContent')
  external void _onDidChangeContent(Function listener);

  void onDidChangeContent(Listener<ModelContentChangedEvent> listener) {
    _onDidChangeContent(allowInterop(listener));
  }
}

// 2930
@JS()
@staticInterop
abstract final class ModelContentChange {}

extension ModelContentChangeJS on ModelContentChange {
  @JS()
  external String get text;
}

// 2952
@JS()
@staticInterop
abstract final class ModelContentChangedEvent {}

extension ModelContentChangedEventJS on ModelContentChangedEvent {
  @JS('changes')
  external List<dynamic> get _changes;

  @JS()
  List<ModelContentChange> get changes {
    return _changes.cast<ModelContentChange>();
  }

  @JS()
  external int get versionId;
}

// 6614
@JS()
@staticInterop
abstract final class Hover {}

extension HoverJS on Hover {}

// dartpad.ts

typedef ProvideHover = Hover? Function(
  TextModel model,
  Position position,
  CancellationToken token,
);

@JS()
external StandaloneCodeEditor createEditor(
  HtmlElement selector, [
  StandaloneCodeEditorOptions? options,
]);

@JS()
external TextModel createModel(
  String? value,
  String? language, [
  Object? uri,
]);

@JS()
external void setupEditorWorker();

@JS('enableDartLanguageService')
external Disposable _enableDartLanguageService(Function provideHover);

Disposable enableDartLanguageService(ProvideHover provideHover) {
  return _enableDartLanguageService(allowInterop(provideHover));
}
