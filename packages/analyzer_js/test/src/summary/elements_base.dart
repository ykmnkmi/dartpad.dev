// Copyright (c) 2022, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:analyzer_js/dart/analysis/results.dart';
import 'package:analyzer_js/src/dart/element/element.dart';
import 'package:test_reflective_loader/test_reflective_loader.dart';

import '../dart/resolution/context_collection_resolution.dart';
import 'element_text.dart';

/// A base for testing building elements.
@reflectiveTest
abstract class ElementsBaseTest extends PubPackageResolutionTest {
  final ElementTextConfiguration configuration = ElementTextConfiguration();

  /// We need to test both cases - when we keep linking libraries (happens for
  /// new or invalidated libraries), and when we load libraries from bytes
  /// (happens internally in Blaze or when we have cached summaries).
  bool get keepLinkingLibraries;

  void addSource(String path, String contents) {
    newFile(path, contents);
  }

  Future<LibraryElementImpl> buildLibrary(
    String text, {
    bool allowErrors = false,
    bool dumpSummaries = false,
    List<Set<String>>? preBuildSequence,
  }) async {
    final file = newFile(testFile.path, text);
    final analysisContext = contextFor(file);
    final analysisSession = analysisContext.currentSession;

    final uriStr = 'package:test/test.dart';
    final libraryResult = await analysisSession.getLibraryByUri(uriStr);
    libraryResult as LibraryElementResult;

    if (keepLinkingLibraries) {
      return libraryResult.element as LibraryElementImpl;
    } else {
      analysisContext.changeFile(file.path);
      await analysisContext.applyPendingFileChanges();
      // Ask again, should be read from bytes.
      final analysisSession = analysisContext.currentSession;
      final libraryResult = await analysisSession.getLibraryByUri(uriStr);
      libraryResult as LibraryElementResult;
      return libraryResult.element as LibraryElementImpl;
    }
  }

  void checkElementText(LibraryElementImpl library, String expected) {
    checkElementTextWithConfiguration(
      library,
      expected,
      configuration: configuration,
    );
  }
}
