import 'dart:async';
import 'dart:js_interop';

import 'package:analyzer/file_system/file_system.dart';
import 'package:archive/archive.dart' show BZip2Decoder, TarDecoder;
import 'package:dartpad/dom.dart';

Future<Folder> initApp(ResourceProvider resourceProvider) {
  var completer = Completer<Folder>();

  void onBuffer(JSArrayBuffer buffer) {
    var bytes = buffer.toDart.asUint8List();

    var tarBytes = BZip2Decoder().decodeBytes(bytes);
    var archive = TarDecoder().decodeBytes(tarBytes);

    var app = resourceProvider.getFolder('/app');

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

  void onResponse(Response response) {
    response.arrayBuffer().then(onBuffer.toJS, onError.toJS);
  }

  self.fetch('archives/app.tar.bz'.toJS).then(onResponse.toJS, onError.toJS);
  return completer.future;
}
