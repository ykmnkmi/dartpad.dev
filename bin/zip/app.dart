import 'dart:io' show Directory, File;

import 'package:archive/archive_io.dart' show BZip2Encoder, TarFileEncoder;
import 'package:path/path.dart' show relative;

import 'types.dart';

Future<void> main(List<String> arguments) async {
  var examplePath = 'example';
  var example = Directory(examplePath);
  var entities = example.listSync(recursive: true);

  var tar = TarFileEncoder();
  var tarPath = 'web/archives/app.tar';
  tar.create(tarPath);

  for (var entity in entities) {
    if (entity is File && isFileSupported(entity.path)) {
      var path = relative(entity.path, from: examplePath);
      await tar.addFile(entity, toPosix(path));
    }
  }

  await tar.close();

  var bZip = BZip2Encoder();
  var tarFile = File(tarPath);
  var bytes = tarFile.readAsBytesSync();
  tarFile.deleteSync();

  var encodedBytes = bZip.encode(bytes);
  File('$tarPath.bz').writeAsBytesSync(encodedBytes);
}
