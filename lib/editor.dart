import 'dart:js_interop';

extension type EditorData._(JSObject _) implements JSObject {
  external factory EditorData(JSNumber id, JSString type);

  external JSNumber get id;

  external JSString get type;
}

extension type EditorResponse._(JSObject _) implements JSObject {
  external factory EditorResponse({
    required JSNumber id,
    JSBoolean? success,
    JSAny? data,
  });
}

extension type HoverData._(JSObject _) implements EditorData {
  external factory HoverData(JSNumber id, JSString type, JSNumber offset);

  external JSNumber get offset;
}
