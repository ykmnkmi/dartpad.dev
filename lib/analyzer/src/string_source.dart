// Copyright (c) 2013, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:dartpad/analyzer/source/source.dart';
import 'package:dartpad/analyzer/src/generated/engine.dart' show TimestampedData;
import 'package:path/path.dart' show posix;

/// An implementation of [Source] that's based on an in-memory Dart string.
final class StringSource implements Source {
  StringSource(String contents, String? fullName, {Uri? uri})
      : _contents = contents,
        fullName = fullName ?? '/test.dart',
        uri = _computeUri(uri);

  /// The content of the source.
  final String _contents;

  @override
  final String fullName;

  @override
  final Uri uri;

  @override
  TimestampedData<String> get contents {
    return TimestampedData(0, _contents);
  }

  @override
  int get hashCode {
    return _contents.hashCode ^ fullName.hashCode;
  }

  @override
  String get shortName {
    return fullName;
  }

  /// Return `true` if the given [object] is a string source that is equal to
  /// this source.
  @override
  bool operator ==(Object object) {
    return object is StringSource && object._contents == _contents && object.fullName == fullName;
  }

  @override
  bool exists() {
    return true;
  }

  static Uri _computeUri(Uri? uri) {
    if (uri != null) {
      return uri;
    }

    return posix.toUri('/test.dart');
  }
}
