@JS('dartpad')
library;

import 'dart:html';

import 'package:dartpad/src/model.dart';
import 'package:js/js.dart';

@JS()
external void setupEditorWorker();

@JS()
abstract class StandaloneCodeEditor {}

@JS()
@anonymous
abstract class EditorOptions {
  external factory EditorOptions({
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
abstract class EditorMinimapOptions {
  external factory EditorMinimapOptions({
    bool? enabled,
  });

  external bool? get enabled;
}

@JS()
external StandaloneCodeEditor createEditor(Element element,
    [EditorOptions? options]);
