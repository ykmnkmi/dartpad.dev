// Copyright (c) 2019, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:analyzer_js/src/error/codes.dart';
import 'package:test_reflective_loader/test_reflective_loader.dart';

import 'sdk_constraint_verifier_support.dart';

main() {
  defineReflectiveSuite(() {
    defineReflectiveTests(SdkVersionAsExpressionInConstContextTest);
  });
}

@reflectiveTest
class SdkVersionAsExpressionInConstContextTest
    extends SdkConstraintVerifierTest {
  test_equals() async {
    await verifyVersion('>=2.5.0', '''
const dynamic a = 2;
const c = (a as int) + 2;
''');
  }

  test_lessThan() async {
    await verifyVersion('>=2.2.0', '''
const dynamic a = 2;
const c = (a as int) + 2;
''', expectedErrors: [
      error(WarningCode.SDK_VERSION_AS_EXPRESSION_IN_CONST_CONTEXT, 32, 8),
    ]);
  }
}
