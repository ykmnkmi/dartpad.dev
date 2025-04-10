// Copyright (c) 2020, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// From https://github.com/dart-lang/sdk/blob/stable/pkg/analysis_server/lib/src/utilities/extensions/element.dart
library;

import 'package:analyzer/dart/element/element2.dart';

extension Element2Extension on Element2 {
  /// The content of the documentation comment (including delimiters) for this
  /// element.
  ///
  /// If the receiver is an element that has fragments, the comment will be a
  /// concatenation of the comments from all of the fragments.
  ///
  /// Returns `null` if the receiver does not have or does not support
  /// documentation.
  String? get documentationCommentOrNull {
    return switch (this) {
      Annotatable(:var documentationComment) => documentationComment,
      _ => null,
    };
  }
}
