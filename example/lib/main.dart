import 'dart:math' show Random;

Future<void> main() async {
  print('Compute π using the Monte Carlo method.');

  await for (var estimate in computePi().take(100)) {
    print('π ≅ $estimate');
  }
}

/// Generates a [Stream] of increasingly accurate estimates of π.
Stream<double> computePi({int batch = 100000}) async* {
  var total = 0; // Inferred to be of type int
  var count = 0;

  while (true) {
    var points = generateRandom().take(batch);
    var inside = points.where((point) => point.isInsideUnitCircle);

    total += batch;
    count += inside.length;

    var ratio = count / total;

    // Area of a circle is A = π⋅r², therefore π = A/r².
    // So, when given random points with x ∈ <0,1>,
    // y ∈ <0,1>, the ratio of those inside a unit circle
    // should approach π / 4. Therefore, the value of π
    // should be:
    yield ratio * 4;
  }
}

Iterable<Point> generateRandom([int? seed]) sync* {
  var random = Random(seed);

  while (true) {
    yield (x: random.nextDouble(), y: random.nextDouble());
  }
}

typedef Point = ({double x, double y});

extension on Point {
  bool get isInsideUnitCircle {
    return x * x + y * y <= 1;
  }
}
