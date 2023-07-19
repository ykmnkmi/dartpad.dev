import 'dart:io' show Directory, File;

import 'package:archive/archive_io.dart' show BZip2Encoder, TarFileEncoder;
import 'package:path/path.dart' show join, relative;

import 'types.dart';

Future<void> main(List<String> arguments) async {
  var sdkPath = join('..', '.sdk');
  var libPath = join(sdkPath, 'lib');

  var lib = Directory(libPath);
  var entities = lib.listSync(recursive: true);

  var tar = TarFileEncoder();
  var tarPath = 'web/archives/sdk.tar';
  tar.create(tarPath);

  var versionPath = join(sdkPath, 'version');
  await tar.addFile(File(versionPath), 'version');

  for (var entity in entities) {
    if (entity is File && isFileSupported(entity.path)) {
      var path = relative(entity.path, from: sdkPath);
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
