@JS('dartpad')
library;

import 'package:js/js.dart';
import 'package:js/js_util.dart';

@JS('enableDartLanguageService')
external Object _enableDartLanguageService();

Future<void> enableDartLanguageService() {
  return promiseToFuture<void>(_enableDartLanguageService());
}
