import 'dart:js_interop';
import 'dart:js_util';

@JS()
@staticInterop
sealed class EditorData implements JSObject {
  external factory EditorData(
    JSNumber id,
    JSString type,
  );
}

extension EditorEventExtension on EditorData {
  external JSNumber get id;

  external JSString get type;
}

@JS()
@anonymous
@staticInterop
final class EditorResponse implements JSObject {
  external factory EditorResponse({
    required JSNumber id,
    JSBoolean? success,
    JSAny? data,
  });
}

@JS()
@staticInterop
final class ModelContentChange implements JSObject {}

extension ModelContentChangeExtension on ModelContentChange {
  @JS('rangeOffset')
  external JSNumber get offset;

  JSNumber get end => add<JSNumber>(offset, length);

  @JS('rangeLength')
  external JSNumber get length;

  external JSString get text;
}

@JS()
@staticInterop
final class EditData implements EditorData {
  external factory EditData(
    JSNumber id,
    JSString type,
    JSArray changes,
  );
}

extension EditEventExtension on EditData {
  external JSArray get changes;
}

@JS()
@staticInterop
final class HoverData implements EditorData {
  external factory HoverData(
    JSNumber id,
    JSString type,
    JSNumber offset,
  );
}

extension HoverEventExtension on HoverData {
  external JSNumber get offset;
}
