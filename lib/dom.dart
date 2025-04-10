import 'dart:js_interop';

extension type Response._(JSObject _) implements JSObject {
  external JSPromise arrayBuffer();
}

extension type MessageEvent._(JSObject _) implements JSObject {
  external JSAny get data;
}

extension PromiseExtension on JSPromise {
  external JSVoid then(JSFunction resolve, [JSFunction? reject]);
}
