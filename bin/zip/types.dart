import 'package:path/path.dart' show extension;

const Set<String> supportedFileExtensions = <String>{
  '.dart',
  '.json',
  '.lock',
  '.packages',
  '.sum',
  '.yaml',
};

bool isFileSupported(String path) {
  var fileExtension = extension(path);
  return supportedFileExtensions.contains(fileExtension);
}

String toPosix(String path) {
  return path.replaceAll('\\', '/');
}
