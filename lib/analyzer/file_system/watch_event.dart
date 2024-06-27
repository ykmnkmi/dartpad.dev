// Copyright (c) 2013, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

/// An event describing a single change to the file system.
final class WatchEvent {
  const WatchEvent(this.type, this.path);

  /// The manner in which the file at [path] has changed.
  final ChangeType type;

  /// The path of the file that changed.
  final String path;
}

/// Enum for what kind of change has happened to a file.
enum ChangeType {
  /// A new file has been added.
  add,

  /// A file has been removed.
  remove,

  /// The contents of a file have changed.
  modify,
}
