function bresenhamsCircleAlgorithm(radius) {
  var points = [];
  var x = 0;
  var y = radius;
  var d = 3 - 2 * radius;
  while (x <= y) {
    points.push([x, y]);
    x++;
    if (d < 0) {
      d += 4 * x + 6;
    } else {
      y--;
      d += 4 * (x - y) + 10;
    }
  }
  return points;
}

export default bresenhamsCircleAlgorithm;