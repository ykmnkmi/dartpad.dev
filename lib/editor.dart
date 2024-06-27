import 'dart:js_interop';

extension type EditorData._(JSObject _) implements JSObject {
  external factory EditorData(
    JSNumber id,
    JSString type,
  );

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

extension type ModelContentChange._(JSObject _) implements JSObject {
  @JS('rangeOffset')
  external JSNumber get offset;

  JSNumber get end {
    return offset.add(length) as JSNumber;
  }

  @JS('rangeLength')
  external JSNumber get length;

  external JSString get text;
}

extension type EditData._(JSObject _) implements EditorData {
  external factory EditData(
    JSNumber id,
    JSString type,
    JSArray<ModelContentChange> changes,
  );

  external JSArray<ModelContentChange> get changes;
}

extension type HoverData._(JSObject _) implements EditorData {
  external factory HoverData(
    JSNumber id,
    JSString type,
    JSNumber offset,
  );

  external JSNumber get offset;
}
