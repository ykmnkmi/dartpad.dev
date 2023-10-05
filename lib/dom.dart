import 'dart:js_interop';

@JS()
@staticInterop
final class Response implements JSObject {}

extension ResponseExtension on Response {
  external JSPromise arrayBuffer();
}

@JS()
@staticInterop
final class MessageEvent implements JSObject {}

extension MessageEventExtension on MessageEvent {
  external JSAny get data;
}

extension PromiseExtension on JSPromise {
  external JSVoid then(JSFunction resolve, [JSFunction? reject]);
}
