// Copyright (c) 2018, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:_fe_analyzer_shared/src/scanner/token.dart';
import 'package:dartpad/analyzer/dart/analysis/features.dart';
import 'package:dartpad/analyzer/dart/analysis/results.dart';
import 'package:dartpad/analyzer/error/error.dart';
import 'package:dartpad/analyzer/error/listener.dart';
import 'package:dartpad/analyzer/source/line_info.dart';
import 'package:dartpad/analyzer/src/dart/analysis/results.dart';
import 'package:dartpad/analyzer/src/dart/ast/ast.dart';
import 'package:dartpad/analyzer/src/dart/scanner/reader.dart';
import 'package:dartpad/analyzer/src/dart/scanner/scanner.dart';
import 'package:dartpad/analyzer/src/generated/parser.dart';
import 'package:dartpad/analyzer/src/string_source.dart';

/// Returns the result of parsing the given [content] as a compilation unit.
///
/// If a [featureSet] is provided, it will be the default set of features that
/// will be assumed by the parser.
///
/// If a [path] is provided, it will be used as the name of the file when
/// reporting errors.
///
/// If [throwIfDiagnostics] is `true` (the default), then if any diagnostics are
/// produced because of syntactic errors in the [content] an `ArgumentError`
/// will be thrown.  This behavior is not intended as a way for the client to
/// find out about errors--it is intended to avoid causing problems for naive
/// clients that might not be thinking about the possibility of parse errors
/// (and might therefore make assumptions about the returned AST that don't hold
/// in the presence of parse errors).  Clients interested in details about parse
/// errors should pass `false` and check `result.errors` to determine what parse
/// errors, if any, have occurred.
ParseStringResult parseString({
  required String content,
  FeatureSet? featureSet,
  String? path,
  bool throwIfDiagnostics = true,
}) {
  featureSet ??= FeatureSet.latestLanguageVersion();

  StringSource source = StringSource(content, path ?? '');
  CharSequenceReader reader = CharSequenceReader(content);
  RecordingErrorListener errorCollector = RecordingErrorListener();
  Scanner scanner = Scanner(source, reader, errorCollector)
    ..configureFeatures(featureSetForOverriding: featureSet, featureSet: featureSet);
  Token token = scanner.tokenize();
  LineInfo lineInfo = LineInfo(scanner.lineStarts);
  Parser parser = Parser(source, errorCollector, featureSet: scanner.featureSet, lineInfo: lineInfo);
  CompilationUnitImpl unit = parser.parseCompilationUnit(token);
  ParseStringResult result = ParseStringResultImpl(content, unit, errorCollector.errors);

  if (throwIfDiagnostics && result.errors.isNotEmpty) {
    StringBuffer buffer = StringBuffer();

    for (AnalysisError error in result.errors) {
      CharacterLocation location = lineInfo.getLocation(error.offset);
      buffer.writeln('  ${error.errorCode.name}: ${error.message} - ${location.lineNumber}:${location.columnNumber}');
    }

    throw ArgumentError('Content produced diagnostics when parsed:\n$buffer');
  }

  return result;
}
