export 'package:dartpad/init/sdk/stub.dart'
    if (dart.library.js) 'package:dartpad/init/sdk/js.dart'
    if (dart.library.io) 'package:dartpad/init/sdk/io.dart';
