function replicateOctant(pointsArray) {
  var arraySize = pointsArray.length;
  var points = [];
  for (var i = 0; i < arraySize; i++) {
    var point = [0, 0];
    point[0] = pointsArray[arraySize - 1 - i][1];
    point[1] = pointsArray[arraySize - 1 - i][0];
    points.push(point);
  }
  return points;
}

function midpointAlgorithm(initialPoint, radius) {
  var points = [];
  var pi = 1 - radius;
  var xi = initialPoint[0];
  var yi = initialPoint[1] + radius;
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
  var otherPoints = replicateOctant(points);
  var concat = points.concat(otherPoints);
  return concat;
}

export default midpointAlgorithm;