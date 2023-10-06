// Copyright (c) 2015, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:analyzer_js/file_system/file_system.dart';
import 'package:path/path.dart' as p;

final RegExp _pubspec = RegExp(r'^[_]?pubspec\.yaml$');

/// Returns `true` if this [entry] is a Dart file.
bool isDartFile(Resource entry) {
  return isDartFileName(entry.path);
}

/// Returns `true` if this [fileName] is a Dart file.
bool isDartFileName(String fileName) {
  return fileName.endsWith('.dart');
}

/// Returns `true` if this relative path is a hidden directory.
bool isInHiddenDir(String relative) {
  return p.split(relative).any((part) => part.startsWith("."));
}

/// Returns `true` if this relative path is a hidden directory.
bool isLintable(Resource file) {
  return file is File && (isDartFile(file) || isPubspecFile(file));
}

/// Returns `true` if this [entry] is a pubspec file.
bool isPubspecFile(Resource entry) {
  return isPubspecFileName(p.basename(entry.path));
}

/// Returns `true` if this [fileName] is a Pubspec file.
bool isPubspecFileName(String fileName) {
  return _pubspec.hasMatch(fileName);
}
