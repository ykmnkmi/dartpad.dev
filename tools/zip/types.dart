import 'package:path/path.dart' show extension;

const Set<String> supportedFileExtensions = <String>{
  '.dart',
  '.json',
  '.lock',
  '.md',
  '.packages',
  '.sum',
  '.yaml',
};

bool isFileSupported(String path) {
  if (path.contains('.dart_tool')) {
    return false;
  }

  var fileExtension = extension(path);

  if (fileExtension.isEmpty) {
    return path.endsWith('README') ||  path.endsWith('OWNERS');
  }

  return supportedFileExtensions.contains(fileExtension);
}

String toPosix(String path) {
  return path.replaceAll('\\', '/');
}
