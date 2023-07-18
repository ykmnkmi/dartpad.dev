// ignore_for_file: avoid_print

import 'package:dartpad/dartpad.dart';

import 'sample.dart' as sample;

Future<void> main() async {
  setupEditorWorker();

  var editorOptions = StandaloneCodeEditorOptions(
    automaticLayout: true,
    language: 'dart',
    scrollBeyondLastLine: false,
    tabSize: 2,
    value: sample.value,
  );

  createEditor('#editor', editorOptions);

  enableDartLanguageService((model, position, token) {
    print((position.lineNumber, position.column));
    return null;
  });
}
