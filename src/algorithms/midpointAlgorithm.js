function midpointAlgorithm(radius) {
  var points = [];
  var pi = 1 - radius;
  var xi = 0;
  var yi = radius;
  points.push([xi, yi]);
  while (xi < yi) {
    xi++;
    if (pi >= 0) {
      yi--;
      pi += 2 * xi - 2 * yi;
    } else {
      pi += 2 * xi + 1;
    }
    points.push([xi, yi]);
  }
  return points;
}

export default midpointAlgorithm;