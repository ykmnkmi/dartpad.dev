/// Copied from `glob` package.
library;

// Copyright (c) 2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:path/path.dart' as p;

import 'package:analyzer_js/file_system/src/ast.dart';
import 'package:analyzer_js/file_system/src/parser.dart';
import 'package:analyzer_js/file_system/src/utils.dart';

/// Regular expression used to quote globs.
final _quoteRegExp = RegExp(r'[*{[?\\}\],\-()]');

/// A glob for matching and listing files and directories.
///
/// A glob matches an entire string as a path. Although the glob pattern uses
/// POSIX syntax, it can match against POSIX, Windows, or URL paths. The format
/// it expects paths to use is based on the `context` parameter to [Glob.new];
/// it defaults to the current system's syntax.
///
/// Paths are normalized before being matched against a glob, so for example the
/// glob `foo/bar` matches the path `foo/./bar`. A relative glob can match an
/// absolute path and vice versa; globs and paths are both interpreted as
/// relative to `context.current`, which defaults to the current working
/// directory.
///
/// When used as a [Pattern], a glob will return either one or zero matches for
/// a string depending on whether the entire string matches the glob. These
/// matches don't currently have capture groups, although this may change in the
/// future.
class Glob implements Pattern {
  /// The pattern used to create this glob.
  final String pattern;

  /// The context in which paths matched against this glob are interpreted.
  final p.Context context;

  /// If true, a path matches if it matches the glob itself or is recursively
  /// contained within a directory that matches.
  final bool recursive;

  /// Whether the glob matches paths case-sensitively.
  bool get caseSensitive => _ast.caseSensitive;

  /// The parsed AST of the glob.
  final AstNode _ast;

  /// Whether [context]'s current directory is absolute.
  bool get _contextIsAbsolute =>
      _contextIsAbsoluteCache ??= context.isAbsolute(context.current);

  bool? _contextIsAbsoluteCache;

  /// Whether [pattern] could match absolute paths.
  bool get _patternCanMatchAbsolute =>
      _patternCanMatchAbsoluteCache ??= _ast.canMatchAbsolute;

  bool? _patternCanMatchAbsoluteCache;

  /// Whether [pattern] could match relative paths.
  bool get _patternCanMatchRelative =>
      _patternCanMatchRelativeCache ??= _ast.canMatchRelative;

  bool? _patternCanMatchRelativeCache;

  /// Returns [contents] with characters that are meaningful in globs
  /// backslash-escaped.
  static String quote(String contents) =>
      contents.replaceAllMapped(_quoteRegExp, (match) => '\\${match[0]}');

  /// Creates a new glob with [pattern].
  ///
  /// Paths matched against the glob are interpreted according to [context]. It
  /// defaults to the system context.
  ///
  /// If [recursive] is true, this glob matches and lists not only the files and
  /// directories it explicitly matches, but anything beneath those as well.
  ///
  /// If [caseSensitive] is true, this glob matches and lists only files whose
  /// case matches that of the characters in the glob. Otherwise, it matches
  /// regardless of case. This defaults to `false` when [context] is Windows and
  /// `true` otherwise.
  factory Glob(
    String pattern, {
    p.Context? context,
    bool recursive = false,
    bool? caseSensitive,
  }) {
    context ??= p.context;
    caseSensitive ??= context.style == p.Style.windows ? false : true;

    if (recursive) pattern += '{,/**}';

    var parser = Parser(pattern, context, caseSensitive: caseSensitive);
    return Glob._(pattern, context, parser.parse(), recursive);
  }

  Glob._(this.pattern, this.context, this._ast, this.recursive);

  /// Returns whether this glob matches [path].
  bool matches(String path) {
    return matchAsPrefix(path) != null;
  }

  @override
  Match? matchAsPrefix(String path, [int start = 0]) {
    // Globs are like anchored RegExps in that they only match entire paths, so
    // if the match starts anywhere after the first character it can't succeed.
    if (start != 0) return null;

    if (_patternCanMatchAbsolute &&
        (_contextIsAbsolute || context.isAbsolute(path))) {
      var absolutePath = context.normalize(context.absolute(path));
      if (_ast.matches(toPosixPath(context, absolutePath))) {
        return GlobMatch(path, this);
      }
    }

    if (_patternCanMatchRelative) {
      var relativePath = context.relative(path);
      if (_ast.matches(toPosixPath(context, relativePath))) {
        return GlobMatch(path, this);
      }
    }

    return null;
  }

  @override
  Iterable<Match> allMatches(String path, [int start = 0]) {
    var match = matchAsPrefix(path, start);
    return match == null ? [] : [match];
  }
}
