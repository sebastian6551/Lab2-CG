function bresenhamsAlgorithm(initialPoint, finalPoint) {
  var points = [];
  var xi = initialPoint[0];
  var yi = initialPoint[1];
  var Δy = Math.abs(finalPoint[1] - initialPoint[1]);
  var Δx = Math.abs(finalPoint[0] - initialPoint[0]);
  var pi = 2 * Δy - Δx;
  points.push([xi, yi]);
  for (var i = 0; i < Δx; i++) {
    if (pi < 0) {
      xi += 1;
      pi += 2 * Δy;
    } else {
      xi += 1;
      yi += 1;
      pi += 2 * Δy - 2 * Δx;
    }
    points.push([xi, yi]);
  }
  return points;
}

export default bresenhamsAlgorithm;
