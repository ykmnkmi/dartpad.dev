// Copyright (c) 2020, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:typed_data';

import 'package:dartpad/analyzer/file_system/file_system.dart';
import 'package:dartpad/analyzer/src/context/packages.dart';
import 'package:dartpad/analyzer/src/dart/analysis/analysis_options_map.dart';
import 'package:dartpad/analyzer/src/dart/analysis/byte_store.dart';
import 'package:dartpad/analyzer/src/dart/analysis/driver.dart';
import 'package:dartpad/analyzer/src/dart/sdk/sdk.dart';
import 'package:dartpad/analyzer/src/generated/engine.dart';
import 'package:dartpad/analyzer/src/generated/sdk.dart';
import 'package:dartpad/analyzer/src/generated/source.dart';
import 'package:dartpad/analyzer/src/summary2/package_bundle_format.dart';
import 'package:yaml/yaml.dart';

/// Build summary for SDK at the given [sdkPath].
///
/// If [embedderYamlPath] is provided, then libraries from this file are
/// appended to the libraries of the specified SDK.
Future<Uint8List> buildSdkSummary({
  required ResourceProvider resourceProvider,
  required String sdkPath,
  String? embedderYamlPath,
}) async {
  FolderBasedDartSdk sdk = FolderBasedDartSdk(
    resourceProvider,
    resourceProvider.getFolder(sdkPath),
  );

  // Append libraries from the embedder.
  if (embedderYamlPath != null) {
    File file = resourceProvider.getFile(embedderYamlPath);
    String content = file.readAsStringSync();
    YamlMap map = loadYaml(content) as YamlMap;

    EmbedderSdk embedderSdk = EmbedderSdk(
      resourceProvider,
      <Folder, YamlMap>{file.parent: map},
      languageVersion: sdk.languageVersion,
    );

    for (SdkLibraryImpl library in embedderSdk.sdkLibraries) {
      String uriStr = library.shortName;

      if (sdk.libraryMap.getLibrary(uriStr) == null) {
        sdk.libraryMap.setLibrary(uriStr, library);
      }
    }
  }

  AnalysisDriverScheduler scheduler = AnalysisDriverScheduler();
  AnalysisOptionsMap optionsMap = AnalysisOptionsMap.forSharedOptions(AnalysisOptionsImpl());

  AnalysisDriver analysisDriver = AnalysisDriver(
    scheduler: scheduler,
    resourceProvider: resourceProvider,
    byteStore: MemoryByteStore(),
    sourceFactory: SourceFactory(<UriResolver>[DartUriResolver(sdk)]),
    analysisOptionsMap: optionsMap,
    packages: Packages(<String, Package>{}),
  );

  scheduler.start();

  List<Uri> libraryUriList = sdk.uris.map(Uri.parse).toList();

  return await analysisDriver.buildPackageBundle(
    uriList: libraryUriList,
    packageBundleSdk: PackageBundleSdk(
      languageVersionMajor: sdk.languageVersion.major,
      languageVersionMinor: sdk.languageVersion.minor,
      allowedExperimentsJson: sdk.allowedExperimentsJson,
    ),
  );
}
