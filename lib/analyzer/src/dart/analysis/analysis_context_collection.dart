// Copyright (c) 2018, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:dartpad/analyzer/dart/analysis/analysis_context_collection.dart';
import 'package:dartpad/analyzer/dart/analysis/context_locator.dart';
import 'package:dartpad/analyzer/dart/analysis/context_root.dart';
import 'package:dartpad/analyzer/file_system/file_system.dart';
import 'package:dartpad/analyzer/src/dart/analysis/context_builder.dart';
import 'package:dartpad/analyzer/src/dart/analysis/driver.dart';
import 'package:dartpad/analyzer/src/dart/analysis/driver_based_analysis_context.dart';
import 'package:dartpad/analyzer/src/summary2/kernel_compilation_service.dart';
import 'package:dartpad/analyzer/src/summary2/macro.dart';
import 'package:dartpad/analyzer/src/workspace/workspace.dart';
import 'package:path/path.dart' show posix;

/// An implementation of [AnalysisContextCollection].
final class AnalysisContextCollectionImpl implements AnalysisContextCollection {
  /// Initialize a newly created analysis context manager.
  AnalysisContextCollectionImpl({
    required List<String> includedPaths,
    List<String>? excludedPaths,
    required this.resourceProvider,
    required String sdkPath,
  }) {
    scheduler.events.drain<void>();
    scheduler.start();

    _throwIfAnyNotAbsoluteNormalizedPath(includedPaths);
    _throwIfNotAbsoluteNormalizedPath(sdkPath);

    ContextLocator contextLocator = ContextLocator(resourceProvider: resourceProvider);
    List<ContextRoot> roots = contextLocator.locateRoots(includedPaths: includedPaths, excludedPaths: excludedPaths);
    ContextBuilderImpl contextBuilder = ContextBuilderImpl(resourceProvider: resourceProvider);

    for (ContextRoot root in roots) {
      DriverBasedAnalysisContext context = contextBuilder.createContext(
        contextRoot: root,
        sdkPath: sdkPath,
        scheduler: scheduler,
        macroSupport: macroSupport,
        ownedFiles: ownedFiles,
      );

      contexts.add(context);
    }
  }

  /// The resource provider used to access the file system.
  final ResourceProvider resourceProvider;

  /// The support for executing macros.
  final MacroSupport macroSupport = KernelMacroSupport();

  /// The shared container into which drivers record files ownership.
  final OwnedFiles ownedFiles = OwnedFiles();

  /// The scheduler used for all analysis contexts.
  final AnalysisDriverScheduler scheduler = AnalysisDriverScheduler();

  /// The list of analysis contexts.
  @override
  final List<DriverBasedAnalysisContext> contexts = <DriverBasedAnalysisContext>[];

  /// Return `true` if the read state of configuration files is consistent
  /// with their current state on the file system. We use this as a work
  /// around an issue with watching for file system changes.
  bool get areWorkspacesConsistent {
    for (DriverBasedAnalysisContext analysisContext in contexts) {
      ContextRoot contextRoot = analysisContext.contextRoot;
      Workspace workspace = contextRoot.workspace;

      if (!workspace.isConsistentWithFileSystem) {
        return false;
      }
    }

    return true;
  }

  @override
  DriverBasedAnalysisContext contextFor(String path) {
    _throwIfNotAbsoluteNormalizedPath(path);

    for (DriverBasedAnalysisContext context in contexts) {
      if (context.contextRoot.isAnalyzed(path)) {
        return context;
      }
    }

    throw StateError('Unable to find the context to $path');
  }

  Future<void> dispose() async {
    for (DriverBasedAnalysisContext analysisContext in contexts) {
      await analysisContext.driver.dispose2();
    }

    await macroSupport.dispose();
    await KernelCompilationService.dispose();
  }

  /// Check every element with [_throwIfNotAbsoluteNormalizedPath].
  void _throwIfAnyNotAbsoluteNormalizedPath(List<String> paths) {
    for (String path in paths) {
      _throwIfNotAbsoluteNormalizedPath(path);
    }
  }

  /// The driver supports only absolute normalized paths, this method is used
  /// to validate any input paths to prevent errors later.
  void _throwIfNotAbsoluteNormalizedPath(String path) {
    if (!posix.isAbsolute(path) || posix.normalize(path) != path) {
      throw ArgumentError('Only absolute normalized paths are supported: $path');
    }
  }
}
