// Copyright (c) 2019, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// ignore_for_file: non_constant_identifier_names

import 'package:dartpad/analyzer/src/dart/analysis/experiments.dart';
import 'package:pub_semver/pub_semver.dart';

/// Information about a single language feature whose presence or absence
/// depends on the supported Dart SDK version, and possibly on the presence of
/// experimental flags.
abstract interface class Feature {
  /// Feature information for class modifiers.
  static final ExperimentalFeature class_modifiers = ExperimentalFeatures.class_modifiers;

  /// Feature information for the 2018 constant update.
  static final ExperimentalFeature constant_update_2018 = ExperimentalFeatures.constant_update_2018;

  /// Feature information for non-nullability by default.
  static final ExperimentalFeature non_nullable = ExperimentalFeatures.non_nullable;

  /// Feature information for constructor tear-offs.
  static final ExperimentalFeature constructor_tearoffs = ExperimentalFeatures.constructor_tearoffs;

  /// Feature information for control flow collections.
  static final ExperimentalFeature control_flow_collections = ExperimentalFeatures.control_flow_collections;

  /// Feature information for enhanced enums.
  static final ExperimentalFeature enhanced_enums = ExperimentalFeatures.enhanced_enums;

  /// Feature information for extension methods.
  static final ExperimentalFeature extension_methods = ExperimentalFeatures.extension_methods;

  /// Feature information for generic metadata.
  static final ExperimentalFeature generic_metadata = ExperimentalFeatures.generic_metadata;

  /// Feature information for inference-update-1.
  static final ExperimentalFeature inference_update_1 = ExperimentalFeatures.inference_update_1;

  /// Feature information for inference-update-2.
  static final ExperimentalFeature inference_update_2 = ExperimentalFeatures.inference_update_2;

  /// Feature information for inference-update-3.
  static final ExperimentalFeature inference_update_3 = ExperimentalFeatures.inference_update_3;

  /// Feature information for inline classes.
  static final ExperimentalFeature inline_class = ExperimentalFeatures.inline_class;

  /// Feature information for macros.
  static final ExperimentalFeature macros = ExperimentalFeatures.macros;

  /// Feature information for patterns.
  static final ExperimentalFeature patterns = ExperimentalFeatures.patterns;

  /// Feature information for records.
  static final ExperimentalFeature records = ExperimentalFeatures.records;

  /// Feature information for spread collections.
  static final ExperimentalFeature spread_collections = ExperimentalFeatures.spread_collections;

  // Feature information for sealed classes.
  static final ExperimentalFeature sealed_class = ExperimentalFeatures.sealed_class;

  /// Feature information for set literals.
  static final ExperimentalFeature set_literals = ExperimentalFeatures.set_literals;

  /// Feature information for super parameters.
  static final ExperimentalFeature super_parameters = ExperimentalFeatures.super_parameters;

  /// Feature information for the triple-shift operator.
  static final ExperimentalFeature triple_shift = ExperimentalFeatures.triple_shift;

  /// Feature information for named arguments anywhere.
  static final ExperimentalFeature named_arguments_anywhere = ExperimentalFeatures.named_arguments_anywhere;

  /// Feature information for non-function type aliases.
  static final ExperimentalFeature nonfunction_type_aliases = ExperimentalFeatures.nonfunction_type_aliases;

  /// Feature information for unnamed libraries.
  static final ExperimentalFeature unnamedLibraries = ExperimentalFeatures.unnamed_libraries;

  /// Feature information for variance.
  static final ExperimentalFeature variance = ExperimentalFeatures.variance;

  /// If the feature may be enabled or disabled on the command line, the
  /// experimental flag that may be used to enable it.  Otherwise `null`.
  ///
  /// Should be `null` if [status] is `current` or `abandoned`.
  String? get experimentalFlag;

  /// If [status] is not `future`, the first language version in which this
  /// feature was enabled by default.  Otherwise `null`.
  Version? get releaseVersion;

  /// The status of the feature.
  FeatureStatus get status;
}

/// An unordered collection of [Feature] objects.
abstract interface class FeatureSet {
  /// Computes the set of features implied by the given set of experimental
  /// enable flags.
  factory FeatureSet.fromEnableFlags2({
    required Version sdkLanguageVersion,
    required List<String> flags,
  }) = ExperimentStatus.fromStrings2;

  /// Computes the set of features for the latest language version known
  /// to the analyzer, without any experiments.  Use it only if you really
  /// don't care which language version you want to use, and sure that the
  /// code that you process is valid for the latest language version.
  ///
  /// Otherwise, it is recommended to use [FeatureSet.fromEnableFlags2].
  factory FeatureSet.latestLanguageVersion() = ExperimentStatus.latestLanguageVersion;

  /// Queries whether the given [feature] is contained in this feature set.
  bool isEnabled(Feature feature);

  /// Computes a subset of this FeatureSet by removing any features that are
  /// not available in the given language version.
  FeatureSet restrictToVersion(Version version);
}

/// Information about the status of a language feature.
enum FeatureStatus {
  /// The language feature has not yet shipped.  It may not be used unless an
  /// experimental flag is used to enable it.
  future,

  /// The language feature has not yet shipped, but we are testing the effect of
  /// enabling it by default.  It may be used in any library with an appropriate
  /// version constraint, unless an experimental flag is used to disable it.
  provisional,

  /// The language feature has been shipped.  It may be used in any library with
  /// an appropriate version constraint.
  current,

  /// The language feature is no longer planned.  It may not be used.
  abandoned,
}
