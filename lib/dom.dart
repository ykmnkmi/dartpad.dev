import 'dart:js_interop';

@JS()
external WindowOrWorkerGlobalScope get self;

@JS()
@staticInterop
final class WindowOrWorkerGlobalScope implements JSObject {}

extension WindowOrWorkerGlobalScopeExtension on WindowOrWorkerGlobalScope {
  external JSPromise fetch(JSString uri);
}

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
