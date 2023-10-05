import 'dart:io' as io show File;

import 'package:analyzer/file_system/file_system.dart';
import 'package:archive/archive.dart' show BZip2Decoder, TarDecoder;

Future<Folder> initApp(ResourceProvider resourceProvider) async {
  var app = resourceProvider.getFolder('/app');
  var bytes = io.File('src/archives/app.tar.bz').readAsBytesSync();
  var tarBytes = BZip2Decoder().decodeBytes(bytes);
  var archive = TarDecoder().decodeBytes(tarBytes);

  for (var archiveFile in archive.files) {
    if (archiveFile.isFile) {
      var file = app.getChildAssumingFile(archiveFile.name);
      file.writeAsBytesSync(archiveFile.content as List<int>);
    }
  }

  return app;
}
