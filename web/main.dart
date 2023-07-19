// ignore_for_file: avoid_print

import 'dart:html' show HtmlElement, document, window;

import 'package:dartpad/dartpad.dart';
import 'package:dartpad/sample.dart' as sample;

void main() {
  var editorElement = document.querySelector('#editor');

  if (editorElement is! HtmlElement) {
    window.alert('#editor HtmlElement not found.');
    return;
  }

  setupEditorWorker();

  var model = createModel(sample.value, 'dart');

  var editorOptions = StandaloneCodeEditorOptions(
    automaticLayout: true,
    model: model,
    scrollBeyondLastLine: false,
    tabSize: 2,
  );

  createEditor(editorElement, editorOptions);
}
