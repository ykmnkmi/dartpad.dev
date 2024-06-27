import 'dart:async';
import 'dart:js_interop';
import 'dart:typed_data';

import 'package:archive/archive.dart';
import 'package:dartpad/analyzer/file_system/file_system.dart';

@JS()
external JSPromise loadSdk(JSFunction onData, JSFunction onError);

Future<Folder> initSdk(ResourceProvider resourceProvider) {
  Completer<Folder> completer = Completer<Folder>();

  void onData(JSUint8Array data) {
    List<int> tarBytes = BZip2Decoder().decodeBytes(data.toDart);
    Archive archive = TarDecoder().decodeBytes(tarBytes);

    Folder app = resourceProvider.getFolder('/sdk');

    for (ArchiveFile archiveFile in archive.files) {
      if (archiveFile.isFile) {
        File file = app.getChildAssumingFile(archiveFile.name);
        file.writeAsBytesSync(archiveFile.content as Uint8List);
      }
    }

    completer.complete(app);
  }

  void onError(JSString reason) {
    if (completer.isCompleted) {
      return;
    }

    completer.completeError(reason.toDart);
  }

  loadSdk(onData.toJS, onError.toJS);
  return completer.future;
}
