import 'dart:js_interop';

extension type MarkdownString._(JSObject _) implements JSObject {
  external factory MarkdownString({String value});

  external String value;
}

extension type Range._(JSObject _) implements JSObject {
  external factory Range({
    int startLineNumber,
    int startColumn,
    int endLineNumber,
    int endColumn,
  });

  external int startLineNumber;

  external int startColumn;

  external int endLineNumber;

  external int endColumn;
}

extension type Hover._(JSObject _) implements JSObject {
  external factory Hover({JSArray<MarkdownString> contents, Range range});

  external JSArray<MarkdownString> contents;

  external Range range;
}
