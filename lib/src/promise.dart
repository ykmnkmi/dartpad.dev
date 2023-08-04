@JS()
library;

import 'package:js/js.dart';

@JS()
@staticInterop
abstract class Promise {
  external factory Promise(void Function(void Function(Object?) resolve, void Function(Object?) reject) executor);
}
