import 'dart:html';

import 'package:dartpad/dartpad.dart';

import 'sample.dart' as sample;

void main() {
  setupEditorWorker();

  var editorOptions = StandaloneCodeEditorOptions(
    automaticLayout: true,
    language: 'dart',
    scrollBeyondLastLine: false,
    tabSize: 2,
    value: sample.value,
  );

  createEditor(document.querySelector('#editor')!, editorOptions);
}
