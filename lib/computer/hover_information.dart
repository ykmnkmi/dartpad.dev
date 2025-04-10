// Copyright (c) 2017, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// From https://github.com/dart-lang/sdk/blob/stable/pkg/analysis_server/lib/protocol/protocol_generated.dart
// From https://github.com/dart-lang/sdk/blob/stable/pkg/analysis_server/lib/src/lsp/mapping.dart
library;

import 'dart:js_interop';

import 'package:analyzer/source/line_info.dart';
import 'package:dartpad/computer/dardoc.dart';
import 'package:dartpad/computer/hover.dart';

/// HoverInformation
///
/// {
///   "offset": int
///   "length": int
///   "containingLibraryPath": optional String
///   "containingLibraryName": optional String
///   "containingClassDescription": optional String
///   "dartdoc": optional String
///   "elementDescription": optional String
///   "elementKind": optional String
///   "isDeprecated": optional bool
///   "parameter": optional String
///   "propagatedType": optional String
///   "staticType": optional String
/// }
///
/// Clients may not extend, implement or mix-in this class.
final class HoverInformation {
  HoverInformation(
    this.offset,
    this.length, {
    this.containingLibraryPath,
    this.containingLibraryName,
    this.containingClassDescription,
    this.dartdoc,
    this.elementDescription,
    this.elementKind,
    this.isDeprecated,
    this.parameter,
    this.propagatedType,
    this.staticType,
  });

  /// The offset of the range of characters that encompasses the cursor
  /// position and has the same hover information as the cursor position.
  int offset;

  /// The length of the range of characters that encompasses the cursor
  /// position and has the same hover information as the cursor position.
  int length;

  /// The path to the defining compilation unit of the library in which the
  /// referenced element is declared. This data is omitted if there is no
  /// referenced element, or if the element is declared inside an HTML file.
  String? containingLibraryPath;

  /// The URI of the containing library, examples here include "dart:core",
  /// "package:.." and file uris represented by the path on disk, "/..". The
  /// data is omitted if the element is declared inside an HTML file.
  String? containingLibraryName;

  /// A human-readable description of the class declaring the element being
  /// referenced. This data is omitted if there is no referenced element, or if
  /// the element is not a class member.
  String? containingClassDescription;

  /// The dartdoc associated with the referenced element. Other than the
  /// removal of the comment delimiters, including leading asterisks in the
  /// case of a block comment, the dartdoc is unprocessed markdown. This data
  /// is omitted if there is no referenced element, or if the element has no
  /// dartdoc.
  String? dartdoc;

  /// A human-readable description of the element being referenced. This data
  /// is omitted if there is no referenced element.
  String? elementDescription;

  /// A human-readable description of the kind of element being referenced
  /// (such as "class" or "function type alias"). This data is omitted if there
  /// is no referenced element.
  String? elementKind;

  /// True if the referenced element is deprecated.
  bool? isDeprecated;

  /// A human-readable description of the parameter corresponding to the
  /// expression being hovered over. This data is omitted if the location is
  /// not in an argument to a function.
  String? parameter;

  /// The name of the propagated type of the expression. This data is omitted
  /// if the location does not correspond to an expression or if there is no
  /// propagated type information.
  String? propagatedType;

  /// The name of the static type of the expression. This data is omitted if
  /// the location does not correspond to an expression.
  String? staticType;
}

extension HoverInformationToJover on HoverInformation {
  Hover toHover(LineInfo lineInfo) {
    const divider = '---';

    var content = StringBuffer();

    // Description + Types.
    var elementDescription = this.elementDescription;
    var staticType = this.staticType;
    var isDeprecated = this.isDeprecated ?? false;

    if (elementDescription != null) {
      content.writeln('```dart');

      if (isDeprecated) {
        content.write('(deprecated) ');
      }

      content
        ..writeln(elementDescription)
        ..writeln('```');
    }

    if (staticType != null) {
      content
        ..writeln('Type: `$staticType`')
        ..writeln();
    }

    // Source library.
    var containingLibraryName = this.containingLibraryName;

    if (containingLibraryName != null && containingLibraryName.isNotEmpty) {
      content
        ..writeln('*$containingLibraryName*')
        ..writeln();
    }

    // Doc comments.
    if (dartdoc != null) {
      if (content.length != 0) {
        content.writeln(divider);
      }

      content.writeln(cleanDartdoc(dartdoc));
    }

    var contents = JSArray<MarkdownString>.withLength(1);
    contents[0] = MarkdownString(value: content.toString().trimRight());
    return Hover(contents: contents, range: toRange(lineInfo, offset, length));
  }
}

Range toRange(LineInfo lineInfo, int offset, int length) {
  assert(offset >= 0);
  assert(length >= 0);

  var start = lineInfo.getLocation(offset);
  var end = lineInfo.getLocation(offset + length);

  return Range(
    startLineNumber: start.lineNumber,
    startColumn: start.columnNumber,
    endLineNumber: end.lineNumber,
    endColumn: end.columnNumber,
  );
}
