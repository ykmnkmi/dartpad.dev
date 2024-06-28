// Copyright (c) 2014, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:dartpad/analyzer/file_system/file_system.dart';
import 'package:dartpad/analyzer/source/source.dart';
import 'package:dartpad/analyzer/src/generated/source.dart' show UriResolver;
import 'package:dartpad/analyzer/src/util/uri.dart';
import 'package:path/path.dart' show posix;

/// A [UriResolver] for [Resource]s.
final class ResourceUriResolver implements UriResolver {
  /// The name of the `file` scheme.
  static final String fileScheme = 'file';

  ResourceUriResolver(this._provider);

  final ResourceProvider _provider;

  ResourceProvider get provider {
    return _provider;
  }

  @override
  Uri pathToUri(String path) {
    return posix.toUri(path);
  }

  @override
  Source? resolveAbsolute(Uri uri) {
    if (!isFileUri(uri)) {
      return null;
    }

    String path = fileUriToNormalizedPath(posix, uri);
    File file = _provider.getFile(path);
    return file.createSource(uri);
  }

  /// Return `true` if the given [uri] is a `file` URI.
  static bool isFileUri(Uri uri) {
    return uri.isScheme(fileScheme);
  }
}
