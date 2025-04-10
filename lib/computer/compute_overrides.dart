// Copyright (c) 2014, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// From https://github.com/dart-lang/sdk/blob/stable/pkg/analysis_server/lib/src/computer/computer_overrides.dart
library;

import 'package:analyzer/dart/element/element2.dart';
import 'package:collection/collection.dart';

/// Return the elements that the given [element] overrides.
OverriddenElements findOverriddenElements(Element2 element) {
  if (element.enclosingElement2 is InterfaceElement2) {
    return _OverriddenElementsFinder(element).find();
  }

  return OverriddenElements(element, <Element2>[], <Element2>[]);
}

/// The container with elements that a class member overrides.
final class OverriddenElements {
  OverriddenElements(this.element, this.superElements, this.interfaceElements);

  /// The element that overrides other class members.
  final Element2 element;

  /// The elements that [element] overrides and which is defined in a class that
  /// is a superclass of the class that defines [element].
  final List<Element2> superElements;

  /// The elements that [element] overrides and which is defined in a class that
  /// which is implemented by the class that defines [element].
  final List<Element2> interfaceElements;
}

final class _OverriddenElementsFinder {
  factory _OverriddenElementsFinder(Element2 seed) {
    var class_ = seed.enclosingElement2 as InterfaceElement2;
    var library = class_.library2;
    var name = seed.displayName;

    List<ElementKind> kinds;

    if (seed is FieldElement2) {
      kinds = <ElementKind>[
        ElementKind.GETTER,
        if (!seed.isFinal) ElementKind.SETTER,
      ];
    } else if (seed is MethodElement2) {
      kinds = const <ElementKind>[ElementKind.METHOD];
    } else if (seed is GetterElement) {
      kinds = const <ElementKind>[ElementKind.GETTER];
    } else if (seed is SetterElement) {
      kinds = const <ElementKind>[ElementKind.SETTER];
    } else {
      kinds = const <ElementKind>[];
    }

    return _OverriddenElementsFinder._(seed, library, class_, name, kinds);
  }

  _OverriddenElementsFinder._(
    this._seed,
    this._library,
    this._class,
    this._name,
    this._kinds,
  );

  Element2 _seed;

  LibraryElement2 _library;

  InterfaceElement2 _class;

  String _name;

  List<ElementKind> _kinds;

  final List<Element2> _superElements = <Element2>[];

  final List<Element2> _interfaceElements = <Element2>[];

  final Set<InterfaceElement2> _visited = {};

  /// Add the [OverriddenElements] for this element.
  OverriddenElements find() {
    _visited.clear();
    _addSuperOverrides(_class, withThisType: false);
    _visited.clear();
    _addInterfaceOverrides(_class, false);
    _superElements.forEach(_interfaceElements.remove);
    return OverriddenElements(_seed, _superElements, _interfaceElements);
  }

  void _addInterfaceOverrides(InterfaceElement2? class_, bool checkType) {
    if (class_ == null) {
      return;
    }

    if (!_visited.add(class_)) {
      return;
    }

    // this type
    if (checkType) {
      var element = _lookupMember(class_);

      if (element != null && !_interfaceElements.contains(element)) {
        _interfaceElements.add(element);
      }
    }

    // interfaces
    for (var interfaceType in class_.interfaces) {
      _addInterfaceOverrides(interfaceType.element3, true);
    }

    // super
    _addInterfaceOverrides(class_.supertype?.element3, checkType);

    if (class_ is MixinElement2) {
      for (var constraint in class_.superclassConstraints) {
        _addInterfaceOverrides(constraint.element3, true);
      }
    }
  }

  void _addSuperOverrides(
    InterfaceElement2? class_, {
    bool withThisType = true,
  }) {
    if (class_ == null) {
      return;
    }

    if (!_visited.add(class_)) {
      return;
    }

    if (withThisType) {
      var element = _lookupMember(class_);

      if (element != null && !_superElements.contains(element)) {
        _superElements.add(element);
      }
    }

    _addSuperOverrides(class_.supertype?.element3);

    for (var mixin_ in class_.mixins) {
      _addSuperOverrides(mixin_.element3);
    }

    if (class_ is MixinElement2) {
      for (var constraint in class_.superclassConstraints) {
        _addSuperOverrides(constraint.element3);
      }
    }
  }

  Element2? _lookupMember(InterfaceElement2 classElement) {
    Element2? findMatchingElement(Iterable<Element2> elements) {
      return elements.firstWhereOrNull((Element2 element) {
        if (!identical(element.library2, _library) && _name.startsWith('_')) {
          return false;
        }

        return element.name3 == _name;
      });
    }

    // method
    if (_kinds.contains(ElementKind.METHOD)) {
      var member = findMatchingElement(classElement.methods2);

      if (member != null) {
        return member;
      }
    }

    // getter
    if (_kinds.contains(ElementKind.GETTER)) {
      var member = findMatchingElement(classElement.getters2);

      if (member != null) {
        return member;
      }
    }

    // setter
    if (_kinds.contains(ElementKind.SETTER)) {
      var member = findMatchingElement(classElement.setters2);

      if (member != null) {
        return member;
      }
    }

    // not found
    return null;
  }
}
