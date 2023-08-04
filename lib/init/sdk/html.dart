import 'package:analyzer_js/file_system/file_system.dart';
import 'package:archive/archive.dart' show BZip2Decoder, TarDecoder;
import 'package:http/http.dart' as http show readBytes;

Future<Folder> initSdk(ResourceProvider resourceProvider) async {
  var app = resourceProvider.getFolder('/sdk');
  var bytes = await http.readBytes(Uri(path: 'archives/sdk.tar.bz'));
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
