import 'dart:js_interop';

import 'package:analyzer_js/file_system/file_system.dart';
import 'package:archive/archive.dart' show BZip2Decoder, TarDecoder;
import 'package:web/web.dart';

Future<Folder> initSdk(ResourceProvider resourceProvider) async {
  var responsePromise = window.fetch('archives/sdk.tar.bz'.toJS);
  var response = await (responsePromise.toDart as Future<Response>);
  var bufferPromise = response.arrayBuffer();
  var buffer = await (bufferPromise.toDart as Future<JSArrayBuffer>);
  var bytes = buffer.toDart.asUint8List();
  var tarBytes = BZip2Decoder().decodeBytes(bytes);
  var archive = TarDecoder().decodeBytes(tarBytes);

  var app = resourceProvider.getFolder('/sdk');

  for (var archiveFile in archive.files) {
    if (archiveFile.isFile) {
      var file = app.getChildAssumingFile(archiveFile.name);
      file.writeAsBytesSync(archiveFile.content as List<int>);
    }
  }

  return app;
}
