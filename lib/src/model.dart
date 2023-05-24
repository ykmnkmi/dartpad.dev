@JS('dartpad')
library;

import 'package:js/js.dart';

@JS()
abstract class ModelContentChange {}

extension ModelContentChangeJS on ModelContentChange {
  @JS()
  external String get text;
}

@JS()
abstract class ModelContentChangedEvent {}

extension ModelContentChangedEventJS on ModelContentChangedEvent {
  @JS()
  external List<ModelContentChange> get changes;

  @JS()
  external int get versionId;
}

@JS()
abstract class TextModel {}

typedef Listener<T> = void Function(T event);

extension TextModelJS on TextModel {
  @JS('onDidChangeContent')
  external void _onDidChangeContent(Function listener);

  void onDidChangeContent(Listener<ModelContentChangedEvent> listener) {
    _onDidChangeContent(allowInterop(listener));
  }
}

@JS()
external TextModel createModel(String? value, String? language, [Object? uri]);
