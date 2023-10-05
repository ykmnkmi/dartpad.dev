import 'dart:js_interop';

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
