// Copyright (c) 2014, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:dartpad/analyzer/dart/analysis/session.dart';
import 'package:dartpad/analyzer/dart/ast/ast.dart';
import 'package:dartpad/analyzer/dart/ast/syntactic_entity.dart';
import 'package:dartpad/analyzer/dart/element/element.dart';
import 'package:dartpad/analyzer/dart/element/type.dart';
import 'package:dartpad/analyzer/source/line_info.dart';
import 'package:dartpad/analyzer/src/dart/ast/element_locator.dart';
import 'package:dartpad/analyzer/src/dart/ast/utilities.dart';
import 'package:dartpad/analyzer/src/dartdoc/dartdoc_directive_info.dart';
import 'package:path/path.dart' show posix;

enum DocumentationPreference {
  none,
  summary,
  full,
}

final class DartUnitHoverComputer {
  DartUnitHoverComputer(
    this.dartdocInfo,
    this.unit,
    this.offset, {
    this.preference = DocumentationPreference.summary,
  });

  final DartdocDirectiveInfo dartdocInfo;

  final CompilationUnit unit;

  final int offset;

  final DocumentationPreference preference;

  String? compute() {
    AstNode? node = NodeLocator(offset).searchWithin(unit);

    if (node == null) {
      return null;
    }

    SyntacticEntity? locationEntity;

    if (node is NamedCompilationUnitMember) {
      locationEntity = node.name;
    } else if (node is Expression) {
      locationEntity = node;
    } else if (node is ExtensionDeclaration) {
      locationEntity = node.name;
    } else if (node is FormalParameter) {
      locationEntity = node.name;
    } else if (node is MethodDeclaration) {
      locationEntity = node.name;
    } else if (node is NamedType) {
      locationEntity = node.name2;
    } else if (node is ConstructorDeclaration) {
      locationEntity = node.name ?? node.returnType;
    } else if (node is DeclaredIdentifier) {
      locationEntity = node.name;
    } else if (node is VariableDeclaration) {
      locationEntity = node.name;
    } else if (node is VariablePattern) {
      locationEntity = node.name;
    } else if (node is PatternFieldName) {
      locationEntity = node.name;
    } else if (node is WildcardPattern) {
      locationEntity = node.name;
    }

    if (locationEntity == null) {
      return null;
    }

    AstNode? parent = node.parent;
    AstNode? grandParent = parent?.parent;

    if (parent is NamedType && grandParent is ConstructorName && grandParent.parent is InstanceCreationExpression) {
      node = grandParent.parent;
    } else if (parent is ConstructorName && grandParent is InstanceCreationExpression) {
      node = grandParent;
    } else if (node is SimpleIdentifier && parent is ConstructorDeclaration && parent.name != null) {
      node = parent;
    }

    if (node is CompilationUnitMember ||
        node is Expression ||
        node is FormalParameter ||
        node is MethodDeclaration ||
        node is NamedType ||
        node is ConstructorDeclaration ||
        node is DeclaredIdentifier ||
        node is VariableDeclaration ||
        node is VariablePattern ||
        node is PatternFieldName ||
        node is DartPattern) {
      HoverInformation hover;

      if (node is InstanceCreationExpression) {
        hover = HoverInformation(node.constructorName.offset, node.constructorName.length);
      } else if (node is ConstructorDeclaration) {
        int offset = node.returnType.offset;
        int end = node.name?.end ?? node.returnType.end;
        int length = end - node.returnType.offset;
        hover = HoverInformation(offset, length);
      } else {
        hover = HoverInformation(locationEntity.offset, locationEntity.length);
      }

      Element? element = ElementLocator.locate(node);

      if (element != null) {
        if (element is PropertyAccessorElement) {
          if (element.isSynthetic) {
            element = element.variable2!;
          }
        }

        String? description = elementDisplayString(element);
        hover.elementDescription = description;

        if (description != null && node is InstanceCreationExpression && node.keyword == null) {
          String prefix = node.isConst ? '(const) ' : '(new) ';
          hover.elementDescription = prefix + description;
        }

        hover.elementKind = element.kind.displayName;
        hover.isDeprecated = element.hasDeprecated;

        if (element.enclosingElement is! ExecutableElement) {
          InterfaceElement? containingClass = element.thisOrAncestorOfType<InterfaceElement>();

          if (containingClass != null && containingClass != element) {
            hover.containingClassDescription = containingClass.displayName;
          }

          LibraryElement? library = element.library;

          if (library != null) {
            Uri uri = library.source.uri;
            AnalysisSession? analysisSession = unit.declaredElement?.session;

            if (uri.isScheme('file') && analysisSession != null) {
              String projectRootDir = analysisSession.analysisContext.contextRoot.root.path;
              String relativePath = posix.relative(posix.fromUri(uri), from: projectRootDir);
              hover.containingLibraryName = relativePath;
            } else {
              hover.containingLibraryName = uri.toString();
            }

            hover.containingLibraryPath = library.source.fullName;
          }
        }

        hover.documentation = computePreferredDocumentation(dartdocInfo, element, preference);
      }

      if (node is Expression) {
        hover.parameter = elementDisplayString(node.staticParameterElement);
      }

      AstNode? parent = node!.parent;
      DartType? staticType;

      if (node is Expression && (element == null || element is VariableElement)) {
        staticType = _getTypeOfDeclarationOrReference(node);
      } else if (element is VariableElement) {
        staticType = element.type;
      } else if (parent is MethodInvocation && parent.methodName == node) {
        staticType = parent.staticInvokeType;

        if (staticType != null && staticType is DynamicType) {
          staticType = null;
        }
      } else if (node is PatternFieldName && parent is PatternField) {
        staticType = parent.pattern.matchedValueType;
      } else if (node is DartPattern) {
        staticType = node.matchedValueType;
      }

      hover.staticType = typeDisplayString(staticType);
      return toHover(unit.lineInfo, hover);
    }

    // not an expression
    return null;
  }

  String? elementDisplayString(Element? element) {
    return element?.getDisplayString(multiline: true);
  }

  String? typeDisplayString(DartType? type) {
    return type?.getDisplayString();
  }

  String? toHover(LineInfo lineInfo, HoverInformation? hover) {
    if (hover == null) {
      return null;
    }

    // Import prefix tooltips are not useful currently.
    // https://github.com/dart-lang/sdk/issues/32735
    if (hover.elementKind == 'import prefix') {
      return null;
    }

    StringBuffer content = StringBuffer();

    // Description + Types.
    String? elementDescription = hover.elementDescription;
    String? staticType = hover.staticType;
    bool isDeprecated = hover.isDeprecated ?? false;

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
    String? containingLibraryName = hover.containingLibraryName;

    if (containingLibraryName != null && containingLibraryName.isNotEmpty) {
      content
        ..writeln('*$containingLibraryName*')
        ..writeln();
    }

    // Doc comments.
    if (hover.documentation != null) {
      if (content.length != 0) {
        content.writeln('---');
      }

      content.writeln(hover.documentation);
    }

    return content.toString().trimRight();
  }

  static Documentation? computeDocumentation(
    DartdocDirectiveInfo dartdocInfo,
    Element elementBeingDocumented, {
    bool includeSummary = false,
  }) {
    Element? element = elementBeingDocumented;

    if (element is FieldFormalParameterElement) {
      element = element.field;
    }

    if (element is ParameterElement) {
      element = element.enclosingElement;
    }

    if (element == null) {
      // This can happen when the code is invalid, such as having a field formal
      // parameter for a field that does not exist.
      return null;
    }

    Element? documentedElement;
    Element? documentedGetter;

    // Look for documentation comments of overridden members
    OverriddenElements overridden = findOverriddenElements(element);

    for (Element candidate in <Element>[element, ...overridden.superElements, ...overridden.interfaceElements]) {
      if (candidate.documentationComment != null) {
        documentedElement = candidate;
        break;
      }

      if (documentedGetter == null && candidate is PropertyAccessorElement && candidate.isSetter) {
        PropertyAccessorElement? getter = candidate.correspondingGetter;

        if (getter != null && getter.documentationComment != null) {
          documentedGetter = getter;
        }
      }
    }

    // Use documentation of a corresponding getter if setters don't have it
    documentedElement ??= documentedGetter;

    if (documentedElement == null) {
      return null;
    }

    String? rawDoc = documentedElement.documentationComment;

    if (rawDoc == null) {
      return null;
    }

    Documentation result = dartdocInfo.processDartdoc(rawDoc, includeSummary: includeSummary);
    Element? documentedElementClass = documentedElement.enclosingElement;

    if (documentedElementClass != null && documentedElementClass != element.enclosingElement) {
      String documentedClass = documentedElementClass.displayName;
      result.full = '${result.full}\n\nCopied from `$documentedClass`.';
    }

    return result;
  }

  /// Compute documentation for [element] and return either the summary or full
  /// docs (or `null`) depending on `preference`.
  static String? computePreferredDocumentation(
    DartdocDirectiveInfo dartdocInfo,
    Element element,
    DocumentationPreference preference,
  ) {
    if (preference == DocumentationPreference.none) {
      return null;
    }

    Documentation? doc = computeDocumentation(
      dartdocInfo,
      element,
      includeSummary: preference == DocumentationPreference.summary,
    );

    return doc is DocumentationWithSummary ? doc.summary : doc?.full;
  }

  static DartType? _getTypeOfDeclarationOrReference(Expression node) {
    if (node is SimpleIdentifier) {
      Element? element = node.staticElement;

      if (element is VariableElement) {
        if (node.inDeclarationContext()) {
          return element.type;
        }

        AstNode? parent = node.parent?.parent;

        if (parent is NamedExpression && parent.name.label == node) {
          return element.type;
        }
      }
    }
    return node.staticType;
  }
}

final class HoverInformation {
  HoverInformation(this.offset, this.length);

  int offset;

  int length;

  String? elementDescription;

  String? elementKind;

  bool? isDeprecated;

  String? containingClassDescription;

  String? containingLibraryName;

  String? containingLibraryPath;

  String? documentation;

  String? parameter;

  String? staticType;
}

OverriddenElements findOverriddenElements(Element element) {
  if (element.enclosingElement is InterfaceElement) {
    return OverriddenElementsFinder(element).find();
  }

  return OverriddenElements(element, <Element>[], <Element>[]);
}

final class OverriddenElements {
  OverriddenElements(this.element, this.superElements, this.interfaceElements);

  final Element element;

  final List<Element> superElements;

  final List<Element> interfaceElements;
}

final class OverriddenElementsFinder {
  factory OverriddenElementsFinder(Element seed) {
    InterfaceElement class_ = seed.enclosingElement as InterfaceElement;
    LibraryElement library = class_.library;
    String name = seed.displayName;

    List<ElementKind> kinds;

    if (seed is FieldElement) {
      kinds = <ElementKind>[ElementKind.GETTER, if (!seed.isFinal) ElementKind.SETTER];
    } else if (seed is MethodElement) {
      kinds = const <ElementKind>[ElementKind.METHOD];
    } else if (seed is PropertyAccessorElement) {
      kinds = seed.isGetter ? const <ElementKind>[ElementKind.GETTER] : const <ElementKind>[ElementKind.SETTER];
    } else {
      kinds = const <ElementKind>[];
    }

    return OverriddenElementsFinder._(seed, library, class_, name, kinds);
  }

  OverriddenElementsFinder._(this.seed, this.library, this.klass, this.name, this.kinds);

  final Element seed;

  final LibraryElement library;

  final InterfaceElement klass;

  final String name;

  final List<ElementKind> kinds;

  final List<Element> superElements = <Element>[];

  final List<Element> interfaceElements = <Element>[];

  final Set<InterfaceElement> visited = <InterfaceElement>{};

  /// Add the [OverriddenElements] for this element.
  OverriddenElements find() {
    visited.clear();
    addSuperOverrides(klass, withThisType: false);
    visited.clear();
    addInterfaceOverrides(klass, false);
    superElements.forEach(interfaceElements.remove);
    return OverriddenElements(seed, superElements, interfaceElements);
  }

  void addInterfaceOverrides(InterfaceElement? klass, bool checkType) {
    if (klass == null) {
      return;
    }

    if (!visited.add(klass)) {
      return;
    }

    if (checkType) {
      Element? element = lookupMember(klass);

      if (element != null && !interfaceElements.contains(element)) {
        interfaceElements.add(element);
      }
    }

    for (InterfaceType interfaceType in klass.interfaces) {
      addInterfaceOverrides(interfaceType.element, true);
    }

    addInterfaceOverrides(klass.supertype?.element, checkType);
  }

  void addSuperOverrides(InterfaceElement? class_, {bool withThisType = true}) {
    if (class_ == null) {
      return;
    }

    if (!visited.add(class_)) {
      return;
    }

    if (withThisType) {
      Element? element = lookupMember(class_);

      if (element != null && !superElements.contains(element)) {
        superElements.add(element);
      }
    }

    addSuperOverrides(class_.supertype?.element);

    for (InterfaceType mixin_ in class_.mixins) {
      addSuperOverrides(mixin_.element);
    }

    if (class_ is MixinElement) {
      for (InterfaceType constraint in class_.superclassConstraints) {
        addSuperOverrides(constraint.element);
      }
    }
  }

  Element? lookupMember(InterfaceElement classElement) {
    Element? member;

    if (kinds.contains(ElementKind.METHOD)) {
      member = classElement.augmented.lookUpMethod(name: name, library: library);

      if (member != null) {
        return member;
      }
    }

    if (kinds.contains(ElementKind.GETTER)) {
      member = classElement.augmented.lookUpGetter(name: name, library: library);

      if (member != null) {
        return member;
      }
    }

    if (kinds.contains(ElementKind.SETTER)) {
      member = classElement.augmented.lookUpSetter(name: '$name=', library: library);

      if (member != null) {
        return member;
      }
    }

    return null;
  }
}
