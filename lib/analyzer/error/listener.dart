// Copyright (c) 2014, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:dartpad/analyzer/dart/ast/ast.dart' show AstNode, ConstructorDeclaration;
import 'package:dartpad/analyzer/dart/ast/token.dart';
import 'package:dartpad/analyzer/dart/element/element.dart';
import 'package:dartpad/analyzer/dart/element/type.dart';
import 'package:dartpad/analyzer/diagnostic/diagnostic.dart';
import 'package:dartpad/analyzer/error/error.dart';
import 'package:dartpad/analyzer/source/source.dart';
import 'package:dartpad/analyzer/src/diagnostic/diagnostic.dart';
import 'package:meta/meta.dart';
import 'package:source_span/source_span.dart';

/// An object that listen for [AnalysisError]s being produced by the analysis
/// engine.
abstract interface class AnalysisErrorListener {
  /// An error listener that ignores errors that are reported to it.
  static final AnalysisErrorListener nullListener = _NullErrorListener();

  /// This method is invoked when an [error] has been found by the analysis
  /// engine.
  void onError(AnalysisError error);
}

/// An [AnalysisErrorListener] that keeps track of whether any error has been
/// reported to it.
final class BooleanErrorListener implements AnalysisErrorListener {
  /// A flag indicating whether an error has been reported to this listener.
  bool _errorReported = false;

  /// Return `true` if an error has been reported to this listener.
  bool get errorReported {
    return _errorReported;
  }

  @override
  void onError(AnalysisError error) {
    _errorReported = true;
  }
}

/// An object used to create analysis errors and report then to an error
/// listener.
final class ErrorReporter {
  /// Initialize a newly created error reporter that will report errors to the
  /// given [errorListener]. Errors will be reported against the
  /// [_defaultSource] unless another source is provided later.
  ErrorReporter(AnalysisErrorListener errorListener, Source source)
      : _errorListener = errorListener,
        _source = source;

  /// The error listener to which errors will be reported.
  final AnalysisErrorListener _errorListener;

  /// The source to be used when reporting errors.
  final Source _source;

  /// The lock level, if greater than zero, no errors will be reported.
  /// This is used to prevent reporting errors inside comments.
  @internal
  int lockLevel = 0;

  Source get source {
    return _source;
  }

  /// Report an error with the given [errorCode] and [arguments].
  /// The [element] is used to compute the location of the error.
  void atElement(
    Element element,
    ErrorCode errorCode, {
    List<Object>? arguments,
    List<DiagnosticMessage>? contextMessages,
    Object? data,
  }) {
    Element nonSynthetic = element.nonSynthetic;

    atOffset(
      errorCode: errorCode,
      offset: nonSynthetic.nameOffset,
      length: nonSynthetic.nameLength,
      arguments: arguments,
      contextMessages: contextMessages,
      data: data,
    );
  }

  /// Report an error with the given [errorCode] and [arguments].
  /// The [node] is used to compute the location of the error.
  void atNode(
    AstNode node,
    ErrorCode errorCode, {
    List<Object>? arguments,
    List<DiagnosticMessage>? contextMessages,
    Object? data,
  }) {
    atOffset(
      errorCode: errorCode,
      offset: node.offset,
      length: node.length,
      arguments: arguments,
      contextMessages: contextMessages,
      data: data,
    );
  }

  /// Report an error with the given [errorCode] and [arguments]. The location
  /// of the error is specified by the given [offset] and [length].
  void atOffset({
    required int offset,
    required int length,
    required ErrorCode errorCode,
    List<Object>? arguments,
    List<DiagnosticMessage>? contextMessages,
    Object? data,
  }) {
    if (lockLevel != 0) {
      return;
    }

    _convertElements(arguments);
    contextMessages ??= [];
    contextMessages.addAll(_convertTypeNames(arguments));
    _errorListener.onError(AnalysisError(
      source: _source,
      offset: offset,
      length: length,
      errorCode: errorCode,
      arguments: arguments ?? const <Object>[],
      contextMessages: contextMessages,
      data: data,
    ));
  }

  /// Report an error with the given [errorCode] and [arguments]. The [token] is
  /// used to compute the location of the error.
  void atToken(
    Token token,
    ErrorCode errorCode, {
    List<Object>? arguments,
    List<DiagnosticMessage>? contextMessages,
    Object? data,
  }) {
    atOffset(
      errorCode: errorCode,
      offset: token.offset,
      length: token.length,
      arguments: arguments,
      contextMessages: contextMessages,
      data: data,
    );
  }

  /// Report the given [error].
  void reportError(AnalysisError error) {
    _errorListener.onError(error);
  }

  /// Report a diagnostic with the given [code] and [arguments]. The
  /// location of the diagnostic will be the name of the [constructor].
  void reportErrorForName(ErrorCode code, ConstructorDeclaration constructor, {List<Object>? arguments}) {
    // TODO(brianwilkerson): Consider extending this method to take any
    //  declaration and compute the correct range for the name of that
    //  declaration. This might make it easier to be consistent.
    if (constructor.name != null) {
      int offset = constructor.returnType.offset;
      atOffset(offset: offset, length: constructor.name!.end - offset, errorCode: code, arguments: arguments);
    } else {
      atNode(constructor.returnType, code, arguments: arguments);
    }
  }

  /// Report an error with the given [errorCode] and [arguments]. The location
  /// of the error is specified by the given [span].
  void reportErrorForSpan(ErrorCode errorCode, SourceSpan span, [List<Object>? arguments]) {
    atOffset(
      offset: span.start.offset,
      length: span.length,
      errorCode: errorCode,
      arguments: arguments,
    );
  }

  /// Convert all [Element]s in the [arguments] into their display strings.
  void _convertElements(List<Object>? arguments) {
    if (arguments == null) {
      return;
    }

    for (int i = 0; i < arguments.length; i++) {
      Object argument = arguments[i];

      if (argument is Element) {
        arguments[i] = argument.getDisplayString();
      } else if (!(argument is String || argument is DartType || argument is int || argument is Uri)) {
        throw ArgumentError('Tried to format an error using ${argument.runtimeType}');
      }
    }
  }

  /// Given an array of [arguments] that is expected to contain two or more
  /// types, convert the types into strings by using the display names of the
  /// types, unless there are two or more types with the same names, in which
  /// case the extended display names of the types will be used in order to
  /// clarify the message.
  List<DiagnosticMessage> _convertTypeNames(List<Object?>? arguments) {
    List<DiagnosticMessage> messages = <DiagnosticMessage>[];

    if (arguments == null) {
      return messages;
    }

    Map<String, List<_TypeToConvert>> typeGroups = {};

    for (int i = 0; i < arguments.length; i++) {
      Object? argument = arguments[i];

      if (argument is DartType) {
        String displayName = argument.getDisplayString();
        List<_TypeToConvert> types = typeGroups.putIfAbsent(displayName, () => <_TypeToConvert>[]);
        types.add(_TypeToConvert(i, argument, displayName));
      }
    }

    for (List<_TypeToConvert> typeGroup in typeGroups.values) {
      if (typeGroup.length == 1) {
        _TypeToConvert typeToConvert = typeGroup[0];
        arguments[typeToConvert.index] = typeToConvert.displayName;
      } else {
        Map<String, Set<Element>> nameToElementMap = {};

        for (_TypeToConvert typeToConvert in typeGroup) {
          for (Element element in typeToConvert.allElements()) {
            Set<Element> elements = nameToElementMap.putIfAbsent(element.name!, () => <Element>{});
            elements.add(element);
          }
        }

        for (_TypeToConvert typeToConvert in typeGroup) {
          // TODO(brianwilkerson): When clients do a better job of displaying
          // context messages, remove the extra text added to the buffer.
          StringBuffer? buffer;

          for (Element element in typeToConvert.allElements()) {
            String name = element.name!;

            if (nameToElementMap[name]!.length > 1) {
              if (buffer == null) {
                buffer = StringBuffer('where ');
              } else {
                buffer.write(', ');
              }

              buffer.write('$name is defined in ${element.source!.fullName}');
            }

            messages.add(DiagnosticMessageImpl(
              filePath: element.source!.fullName,
              length: element.nameLength,
              message: '$name is defined in ${element.source!.fullName}',
              offset: element.nameOffset,
              url: null,
            ));
          }

          if (buffer != null) {
            arguments[typeToConvert.index] = '${typeToConvert.displayName} ($buffer)';
          } else {
            arguments[typeToConvert.index] = typeToConvert.displayName;
          }
        }
      }
    }

    return messages;
  }
}

/// An error listener that will record the errors that are reported to it in a
/// way that is appropriate for caching those errors within an analysis context.
final class RecordingErrorListener implements AnalysisErrorListener {
  Set<AnalysisError>? _errors;

  /// Return the errors collected by the listener.
  List<AnalysisError> get errors {
    if (_errors == null) {
      return const <AnalysisError>[];
    }

    return _errors!.toList();
  }

  /// Return the errors collected by the listener for the given [source].
  List<AnalysisError> getErrorsForSource(Source source) {
    if (_errors == null) {
      return const <AnalysisError>[];
    }

    return _errors!.where((AnalysisError error) => error.source == source).toList();
  }

  @override
  void onError(AnalysisError error) {
    (_errors ??= <AnalysisError>{}).add(error);
  }
}

/// An [AnalysisErrorListener] that ignores error.
final class _NullErrorListener implements AnalysisErrorListener {
  @override
  void onError(AnalysisError event) {
    // Ignore errors
  }
}

/// Used by `ErrorReporter._convertTypeNames` to keep track of a type that is
/// being converted.
class _TypeToConvert {
  _TypeToConvert(this.index, this.type, this.displayName);

  final int index;

  final DartType type;

  final String displayName;

  List<Element>? _allElements;

  List<Element> allElements() {
    if (_allElements == null) {
      Set<Element> elements = <Element>{};

      void addElementsFrom(DartType type) {
        if (type is FunctionType) {
          addElementsFrom(type.returnType);

          for (ParameterElement parameter in type.parameters) {
            addElementsFrom(parameter.type);
          }
        } else if (type is InterfaceType) {
          if (elements.add(type.element)) {
            for (DartType typeArgument in type.typeArguments) {
              addElementsFrom(typeArgument);
            }
          }
        }
      }

      addElementsFrom(type);

      _allElements = elements.where((Element element) {
        String? name = element.name;
        return name != null && name.isNotEmpty;
      }).toList();
    }

    return _allElements!;
  }
}
