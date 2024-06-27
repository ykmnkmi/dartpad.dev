// Copyright (c) 2014, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';

import 'package:dartpad/analyzer/file_system/file_system.dart';
import 'package:dartpad/analyzer/file_system/watch_event.dart';
import 'package:dartpad/analyzer/source/source.dart';
import 'package:dartpad/analyzer/src/source/source_resource.dart';
import 'package:meta/meta.dart';
import 'package:path/path.dart' as posix;

/// An in-memory implementation of [ResourceProvider].
/// Use `/` as a path separator.
final class MemoryResourceProvider implements ResourceProvider {
  MemoryResourceProvider({this.delayWatcherInitialization});

  final Map<String, _ResourceData> _pathToData = <String, _ResourceData>{};

  final Map<String, String> _pathToLinkedPath = <String, String>{};

  final Map<String, List<StreamController<WatchEvent>>> _pathToWatchers =
      <String, List<StreamController<WatchEvent>>>{};

  int nextStamp = 0;

  /// An artificial delay that's waited when initializing watchers.
  ///
  /// This allows mirroring how the real fs watcher works, where events may be
  /// lost between creating the watcher and its `ready` event firing.
  ///
  /// Like the real file watcher, the `ready` event also requires a listener
  /// to be attached before it will fire.
  @visibleForTesting
  final Duration? delayWatcherInitialization;

  /// Paths that should have `PathNotFoundException`s emitted on their watch
  /// streams.
  @visibleForTesting
  final Set<String> emitPathNotFoundExceptionsForPaths = <String>{};

  /// Delete the file with the given path.
  void deleteFile(String path) {
    _ResourceData? data = _pathToData[path];

    if (data is! _FileData) {
      throw FileSystemException(path, 'Not a file.');
    }

    _pathToData.remove(path);
    _removeFromParentFolderData(path);

    _notifyWatchers(path, ChangeType.remove);
  }

  /// Delete the folder with the given path
  /// and recursively delete nested files and folders.
  void deleteFolder(String path) {
    _ResourceData? data = _pathToData[path];

    if (data is! _FolderData) {
      throw FileSystemException(path, 'Not a folder.');
    }

    for (String childName in data.childNames.toList()) {
      String childPath = posix.join(path, childName);
      Resource child = getResource(childPath);

      if (child is File) {
        deleteFile(child.path);
      } else if (child is Folder) {
        deleteFolder(child.path);
      } else {
        throw FileSystemException(path, 'failed to delete resource: $child');
      }
    }

    if (_pathToData[path] != data) {
      throw StateError('Unexpected concurrent modification: $path');
    }

    if (data.childNames.isNotEmpty) {
      throw StateError('Must be empty.');
    }

    _pathToData.remove(path);
    _removeFromParentFolderData(path);

    _notifyWatchers(path, ChangeType.remove);
  }

  @override
  File getFile(String path) {
    _ensureAbsoluteAndNormalized(path);
    return _MemoryFile(this, path);
  }

  @override
  Folder getFolder(String path) {
    _ensureAbsoluteAndNormalized(path);
    return _MemoryFolder(this, path);
  }

  @override
  Link getLink(String path) {
    _ensureAbsoluteAndNormalized(path);
    return _MemoryLink(this, path);
  }

  @override
  Resource getResource(String path) {
    _ensureAbsoluteAndNormalized(path);

    _ResourceData? data = _pathToData[path];
    return data is _FolderData ? _MemoryFolder(this, path) : _MemoryFile(this, path);
  }

  @override
  Folder getStateLocation(String pluginId) {
    return newFolder('/user/home/$pluginId');
  }

  void modifyFile(String path, String content) {
    _ResourceData? data = _pathToData[path];

    if (data is! _FileData) {
      throw FileSystemException(path, 'Not a file.');
    }

    Uint8List bytes = utf8.encode(content);
    _setFileContent(path, bytes);
  }

  File newFile(String path, String content) {
    Uint8List bytes = utf8.encode(content);
    return newFileWithBytes(path, bytes);
  }

  File newFileWithBytes(String path, Uint8List bytes) {
    _ensureAbsoluteAndNormalized(path);
    return _setFileContent(path, bytes);
  }

  Folder newFolder(String path) {
    _newFolder(path);
    return _MemoryFolder(this, path);
  }

  /// Create a link from the [path] to the [target].
  void newLink(String path, String target) {
    _ensureAbsoluteAndNormalized(path);
    _ensureAbsoluteAndNormalized(target);
    _pathToLinkedPath[path] = target;
  }

  /// Write a representation of the file system on the given [sink].
  void writeOn(StringSink sink) {
    List<String> paths = _pathToData.keys.toList();
    paths.sort();
    paths.forEach(sink.writeln);
  }

  void _addToParentFolderData(_FolderData parentData, String path) {
    String childName = posix.basename(path);

    if (!parentData.childNames.contains(childName)) {
      parentData.childNames.add(childName);
    }
  }

  /// The file system abstraction supports only absolute and normalized paths.
  /// This method is used to validate any input paths to prevent errors later.
  void _ensureAbsoluteAndNormalized(String path) {
    if (!posix.isAbsolute(path)) {
      throw ArgumentError('Path must be absolute : $path');
    }

    if (posix.normalize(path) != path) {
      throw ArgumentError('Path must be normalized : $path');
    }
  }

  _FolderData _newFolder(String path) {
    _ensureAbsoluteAndNormalized(path);

    _ResourceData? data = _pathToData[path];

    if (data is _FolderData) {
      return data;
    }

    if (data == null) {
      String parentPath = posix.dirname(path);

      if (parentPath != path) {
        _FolderData parentData = _newFolder(parentPath);
        _addToParentFolderData(parentData, path);
      }

      _FolderData data = _FolderData();
      _pathToData[path] = data;
      _notifyWatchers(path, ChangeType.add);
      return data;
    }

    throw FileSystemException(path, 'Folder expected.');
  }

  void _notifyWatchers(String path, ChangeType changeType) {
    _pathToWatchers.forEach((String watcherPath, List<StreamController<WatchEvent>> streamControllers) {
      if (watcherPath == path || posix.isWithin(watcherPath, path)) {
        for (StreamController<WatchEvent> streamController in streamControllers) {
          streamController.add(WatchEvent(changeType, path));
        }
      }
    });
  }

  void _removeFromParentFolderData(String path) {
    String parentPath = posix.dirname(path);
    _FolderData parentData = _pathToData[parentPath] as _FolderData;
    String childName = posix.basename(path);
    parentData.childNames.remove(childName);
  }

  void _renameFileSync(String path, String newPath) {
    _ResourceData? data = _pathToData[path];

    if (data is! _FileData) {
      throw FileSystemException(path, 'Not a file.');
    }

    if (newPath == path) {
      return;
    }

    _ResourceData? existingNewData = _pathToData[newPath];

    if (existingNewData == null) {
      // Nothing to do.
    } else if (existingNewData is _FileData) {
      deleteFile(newPath);
    } else {
      throw FileSystemException(newPath, 'Not a file.');
    }

    String parentPath = posix.dirname(path);
    _FolderData parentData = _newFolder(parentPath);
    _addToParentFolderData(parentData, path);

    _pathToData.remove(path);
    _pathToData[newPath] = data;

    _notifyWatchers(path, ChangeType.remove);
    _notifyWatchers(newPath, ChangeType.add);
  }

  String _resolveLinks(String path) {
    String parentPath = posix.dirname(path);

    if (parentPath == path) {
      return path;
    }

    String canonicalParentPath = _resolveLinks(parentPath);

    String baseName = posix.basename(path);
    String result = posix.join(canonicalParentPath, baseName);

    do {
      String? linkTarget = _pathToLinkedPath[result];

      if (linkTarget != null) {
        result = linkTarget;
      } else {
        break;
      }
    } while (true);

    return result;
  }

  File _setFileContent(String path, Uint8List bytes) {
    String parentPath = posix.dirname(path);
    _FolderData parentData = _newFolder(parentPath);
    _addToParentFolderData(parentData, path);

    bool exists = _pathToData.containsKey(path);
    _pathToData[path] = _FileData(bytes, nextStamp++);
    _notifyWatchers(path, exists ? ChangeType.modify : ChangeType.add);
    return _MemoryFile(this, path);
  }
}

final class _FileData extends _ResourceData {
  _FileData(this.bytes, this.timeStamp);

  final Uint8List bytes;

  final int timeStamp;
}

final class _FolderData extends _ResourceData {
  /// Names (not paths) of direct children.
  final List<String> childNames = <String>[];
}

/// An in-memory implementation of [File].
final class _MemoryFile extends _MemoryResource implements File {
  _MemoryFile(super.provider, super.path);

  @override
  bool get exists {
    String canonicalPath = provider._resolveLinks(path);
    return provider._pathToData[canonicalPath] is _FileData;
  }

  @override
  int get lengthSync {
    Uint8List bytes = readAsBytesSync();
    return bytes.length;
  }

  @override
  int get modificationStamp {
    String canonicalPath = provider._resolveLinks(path);
    _ResourceData? data = provider._pathToData[canonicalPath];

    if (data is! _FileData) {
      throw FileSystemException(path, 'File does not exist.');
    }

    return data.timeStamp;
  }

  @override
  File copyTo(Folder parentFolder) {
    parentFolder.create();

    File destination = parentFolder.getChildAssumingFile(shortName);
    destination.writeAsBytesSync(readAsBytesSync());
    return destination;
  }

  @override
  Source createSource([Uri? uri]) {
    uri ??= posix.toUri(path);
    return FileSource(this, uri);
  }

  @override
  void delete() {
    provider.deleteFile(path);
  }

  @override
  bool isOrContains(String path) {
    return path == this.path;
  }

  @override
  Uint8List readAsBytesSync() {
    String canonicalPath = provider._resolveLinks(path);
    _ResourceData? data = provider._pathToData[canonicalPath];

    if (data is! _FileData) {
      throw FileSystemException(path, 'File does not exist.');
    }

    return data.bytes;
  }

  @override
  String readAsStringSync() {
    Uint8List bytes = readAsBytesSync();
    return utf8.decode(bytes);
  }

  @override
  File renameSync(String newPath) {
    provider._renameFileSync(path, newPath);
    return provider.getFile(newPath);
  }

  @override
  File resolveSymbolicLinksSync() {
    String canonicalPath = provider._resolveLinks(path);
    File result = provider.getFile(canonicalPath);

    if (!result.exists) {
      throw FileSystemException(path, 'File does not exist.');
    }

    return result;
  }

  @override
  void writeAsBytesSync(Uint8List bytes) {
    provider._setFileContent(path, bytes);
  }

  @override
  void writeAsStringSync(String content) {
    Uint8List bytes = utf8.encode(content);
    writeAsBytesSync(bytes);
  }
}

/// An in-memory implementation of [Folder].
final class _MemoryFolder extends _MemoryResource implements Folder {
  _MemoryFolder(super.provider, super.path);

  @override
  bool get exists {
    String canonicalPath = provider._resolveLinks(path);
    return provider._pathToData[canonicalPath] is _FolderData;
  }

  @override
  bool get isRoot {
    String parentPath = posix.dirname(path);
    return parentPath == path;
  }

  @override
  String canonicalizePath(String relPath) {
    relPath = posix.normalize(relPath);

    String childPath = posix.join(path, relPath);
    childPath = posix.normalize(childPath);
    return childPath;
  }

  @override
  bool contains(String path) {
    return posix.isWithin(this.path, path);
  }

  @override
  Folder copyTo(Folder parentFolder) {
    Folder destination = parentFolder.getChildAssumingFolder(shortName);
    destination.create();

    for (Resource child in getChildren()) {
      child.copyTo(destination);
    }

    return destination;
  }

  @override
  void create() {
    provider.newFolder(path);
  }

  @override
  void delete() {
    provider.deleteFolder(path);
  }

  @override
  Resource getChild(String relPath) {
    String path = canonicalizePath(relPath);
    return provider.getResource(path);
  }

  @override
  _MemoryFile getChildAssumingFile(String relPath) {
    String path = canonicalizePath(relPath);
    return _MemoryFile(provider, path);
  }

  @override
  _MemoryFolder getChildAssumingFolder(String relPath) {
    String path = canonicalizePath(relPath);
    return _MemoryFolder(provider, path);
  }

  @override
  List<Resource> getChildren() {
    String canonicalPath = provider._resolveLinks(path);

    if (canonicalPath != path) {
      Folder target = provider.getFolder(canonicalPath);
      List<Resource> canonicalChildren = target.getChildren();

      // TODO: generate
      return canonicalChildren.map<Resource>((Resource child) {
        String childPath = posix.join(path, child.shortName);

        if (child is Folder) {
          return _MemoryFolder(provider, childPath);
        }

        return _MemoryFile(provider, childPath);
      }).toList();
    }

    _ResourceData? data = provider._pathToData[path];

    if (data is! _FolderData) {
      throw FileSystemException(path, 'Folder does not exist.');
    }

    List<Resource> children = <Resource>[];

    for (String childName in data.childNames) {
      String childPath = posix.join(path, childName);
      Resource child = provider.getResource(childPath);
      children.add(child);
    }

    provider._pathToLinkedPath.forEach((String resourcePath, String targetPath) {
      if (posix.dirname(resourcePath) == path) {
        Resource target = provider.getResource(targetPath);

        if (target is File) {
          children.add(_MemoryFile(provider, resourcePath));
        } else if (target is Folder) {
          children.add(_MemoryFolder(provider, resourcePath));
        }
      }
    });

    return children;
  }

  @override
  bool isOrContains(String path) {
    return path == this.path || contains(path);
  }

  @override
  Folder resolveSymbolicLinksSync() {
    String canonicalPath = provider._resolveLinks(path);
    Folder result = provider.getFolder(canonicalPath);

    if (!result.exists) {
      throw FileSystemException(path, 'Folder does not exist.');
    }

    return result;
  }

  @override
  Uri toUri() {
    return posix.toUri('$path/');
  }
}

/// An in-memory implementation of [File].
final class _MemoryLink implements Link {
  _MemoryLink(this.provider, this.path);

  final MemoryResourceProvider provider;

  final String path;

  @override
  bool get exists {
    return provider._pathToLinkedPath.containsKey(path);
  }

  @override
  void create(String target) {
    provider.newLink(path, target);
  }
}

/// An in-memory implementation of [Resource].
abstract base class _MemoryResource implements Resource {
  _MemoryResource(this.provider, this.path);

  @override
  final MemoryResourceProvider provider;

  @override
  final String path;

  Stream<WatchEvent> get changes {
    var watcher = watch();
    return watcher.changes;
  }

  @override
  int get hashCode {
    return path.hashCode;
  }

  @override
  Folder get parent {
    String parentPath = posix.dirname(path);
    return provider.getFolder(parentPath);
  }

  @override
  String get shortName {
    return posix.basename(path);
  }

  @override
  bool operator ==(Object other) {
    return other is _MemoryResource && path == other.path;
  }

  @override
  Uri toUri() {
    return posix.toUri(path);
  }

  /// Watch for changes to the files inside this folder (and in any nested
  /// folders, including folders reachable via links).
  ///
  /// If [MemoryResourceProvider.delayWatcherInitialization] is not `null`, this
  /// method will wait for this amount of time before it starts
  /// capturing/streaming events to simulate the delay that occurs when
  /// initializing a real file system watcher.
  @override
  ResourceWatcher watch() {
    StreamController<WatchEvent> streamController = StreamController<WatchEvent>.broadcast();
    Completer<void> ready = Completer<void>();

    /// A helper that sets up the watcher that may be called synchronously
    /// or delayed, depending on the value of
    /// [provider.delayWatcherInitialization].
    void setupWatcher() {
      List<StreamController<WatchEvent>> watchers = provider._pathToWatchers[path] ??= <StreamController<WatchEvent>>[];
      watchers.add(streamController);
      streamController.done.then<void>((void _) {
        watchers.remove(streamController);
        if (watchers.isEmpty) {
          provider._pathToWatchers.remove(path);
        }
      });

      ready.complete();

      if (provider.emitPathNotFoundExceptionsForPaths.contains(path)) {
        streamController.addError(PathNotFoundException(path, 'Simulated PathNotFoundException from _MemoryResource'));
      }
    }

    Duration? delayWatcherInitialization = provider.delayWatcherInitialization;

    if (delayWatcherInitialization != null) {
      // Wrap this inside onListen so that (like the real watcher) it will only
      // fire after a listener is attached.
      streamController.onListen = () {
        Future<void>.delayed(delayWatcherInitialization, () {
          streamController.onListen = null;
          setupWatcher();
        });
      };
    } else {
      setupWatcher();
    }

    return ResourceWatcher(streamController.stream, () => ready.future);
  }
}

class _ResourceData {}
