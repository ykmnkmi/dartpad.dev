import 'dart:async';
import 'dart:js_interop';

import 'package:analyzer/file_system/file_system.dart';
import 'package:archive/archive.dart' show BZip2Decoder, TarDecoder;
import 'package:dartpad/dom.dart';

@JS()
external JSPromise loadSdk();

Future<Folder> initSdk(ResourceProvider resourceProvider) {
  var completer = Completer<Folder>();

  void onBytes(JSUint8Array bytes) {
    var tarBytes = BZip2Decoder().decodeBytes(bytes.toDart);
    var archive = TarDecoder().decodeBytes(tarBytes);

    var app = resourceProvider.getFolder('/sdk');

    for (var archiveFile in archive.files) {
      if (archiveFile.isFile) {
        var file = app.getChildAssumingFile(archiveFile.name);
        file.writeAsBytesSync(archiveFile.content as List<int>);
      }
    }

    completer.complete(app);
  }

  void onError(JSAny reason) {
    if (completer.isCompleted) {
      return;
    }

    completer.completeError(reason.toJSBox);
  }

  loadSdk().then(onBytes.toJS, onError.toJS);
  return completer.future;
}
