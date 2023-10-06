// Copyright (c) 2015, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:async';
import 'dart:js_interop';

import 'package:analyzer_js/dart/analysis/results.dart';
import 'package:analyzer_js/file_system/file_system.dart';
import 'package:analyzer_js/instrumentation/instrumentation.dart';
import 'package:analyzer_js/src/analysis_options/analysis_options_provider.dart';
import 'package:analyzer_js/src/dart/analysis/analysis_context_collection.dart';
import 'package:analyzer_js/src/generated/engine.dart';
import 'package:analyzer_js/src/generated/sdk.dart';
import 'package:analyzer_js/src/generated/source.dart';
import 'package:analyzer_js/src/lint/linter.dart';
import 'package:analyzer_js/src/task/options.dart';
import 'package:yaml/yaml.dart';

@JS('console.log')
external JSVoid consoleLog(JSAny? value);

@JS('console.error')
external JSVoid consoleError(JSAny? value);

AnalysisOptionsProvider _optionsProvider = AnalysisOptionsProvider();

Source createSource(ResourceProvider resourceProvider, Uri sourceUri) {
  return resourceProvider
      .getFile(sourceUri.toFilePath())
      .createSource(sourceUri);
}

/// Print the given message and exit with the given [exitCode]
void printAndFail(String message, {int exitCode = 15}) {
  print(message);
  Zone.root.handleUncaughtError(Exception(exitCode), StackTrace.empty);
}

void _updateAnalyzerOptions(
  AnalysisOptionsImpl analysisOptions,
  LinterOptions options,
) {
  if (options.analysisOptions != null) {
    YamlMap map =
        _optionsProvider.getOptionsFromString(options.analysisOptions);
    applyToAnalysisOptions(analysisOptions, map);
  }

  analysisOptions.hint = false;
  analysisOptions.lint = options.enableLints;
  analysisOptions.enableTiming = options.enableTiming;
  analysisOptions.lintRules = options.enabledLints.toList(growable: false);
}

class DriverOptions {
  /// The maximum number of sources for which AST structures should be kept
  /// in the cache.  The default is 512.
  int cacheSize = 512;

  /// The path to the dart SDK.
  String? dartSdkPath;

  /// Whether to show lint warnings.
  bool enableLints = true;

  /// Whether to gather timing data during analysis.
  bool enableTiming = false;

  /// The path to a `.packages` configuration file
  String? packageConfigPath;

  /// Whether to use Dart's Strong Mode analyzer.
  bool strongMode = true;

  /// The mock SDK (to speed up testing) or `null` to use the actual SDK.
  @Deprecated('Use createMockSdk() and set dartSdkPath')
  DartSdk? mockSdk;

  /// Return `true` is the parser is able to parse asserts in the initializer
  /// list of a constructor.
  @deprecated
  bool get enableAssertInitializer => true;

  /// Set whether the parser is able to parse asserts in the initializer list of
  /// a constructor to match [enable].
  @deprecated
  set enableAssertInitializer(bool enable) {
    // Ignored because the option is now always enabled.
  }
}

class LintDriver {
  /// The files which have been analyzed so far.  This is used to compute the
  /// total number of files analyzed for statistics.
  final Set<String> _filesAnalyzed = {};

  final LinterOptions options;

  LintDriver(this.options);

  /// Return the number of sources that have been analyzed so far.
  int get numSourcesAnalyzed => _filesAnalyzed.length;

  Future<List<AnalysisErrorInfo>> analyze(Iterable<File> files) async {
    AnalysisEngine.instance.instrumentationService = JSInstrumentation();

    // TODO(scheglov) Enforce normalized absolute paths in the config.
    var packageConfigPath = options.packageConfigPath;
    packageConfigPath = _absoluteNormalizedPath.ifNotNull(packageConfigPath);

    var contextCollection = AnalysisContextCollectionImpl(
      resourceProvider: options.resourceProvider,
      packagesFile: packageConfigPath,
      sdkPath: options.dartSdkPath,
      includedPaths:
          files.map((file) => _absoluteNormalizedPath(file.path)).toList(),
      updateAnalysisOptions2: ({
        required analysisOptions,
        required contextRoot,
        required sdk,
      }) {
        _updateAnalyzerOptions(analysisOptions, options);
      },
    );

    for (File file in files) {
      var path = _absoluteNormalizedPath(file.path);
      _filesAnalyzed.add(path);
    }

    var result = <AnalysisErrorInfo>[];
    for (var path in _filesAnalyzed) {
      var analysisContext = contextCollection.contextFor(path);
      var analysisSession = analysisContext.currentSession;
      var errorsResult = await analysisSession.getErrors(path);
      if (errorsResult is ErrorsResult) {
        result.add(
          AnalysisErrorInfoImpl(
            errorsResult.errors,
            errorsResult.lineInfo,
          ),
        );
      }
    }
    return result;
  }

  String _absoluteNormalizedPath(String path) {
    var pathContext = options.resourceProvider.pathContext;
    path = pathContext.absolute(path);
    path = pathContext.normalize(path);
    return path;
  }
}

/// Prints logging information comments to the [outSink] and error messages to
/// [errorSink].
class JSInstrumentation extends NoopInstrumentationService {
  @override
  void logError(String message, [Object? exception]) {
    if (exception == null) {
      consoleError(message.toJS);
    } else {
      consoleError('$message\n$exception'.toJS);
    }
  }

  @override
  void logException(dynamic exception,
      [StackTrace? stackTrace,
      List<InstrumentationServiceAttachment>? attachments]) {
    if (stackTrace == null) {
      consoleError('$exception'.toJS);
    } else {
      consoleError('$exception\n$stackTrace'.toJS);
    }
  }

  @override
  void logInfo(String message, [Object? exception]) {
    if (exception == null) {
      consoleLog(message.toJS);
    } else {
      consoleLog('$message\n$exception'.toJS);
    }
  }
}

extension _UnaryFunctionExtension<T, R> on R Function(T) {
  /// Invoke this function if [t] is not `null`, otherwise return `null`.
  R? ifNotNull(T? t) {
    if (t != null) {
      return this(t);
    } else {
      return null;
    }
  }
}
