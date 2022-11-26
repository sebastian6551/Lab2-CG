function bresenhamsCircleAlgorithm(centre, radius) {
  //Center and radius
  var points = [];
  var x = 0;
  var y = radius;
  var d = 3 - 2 * radius;
  while (x <= y) {
    let xPlot = x + centre[0];
    let yPlot = y + centre[1];
    points.push([xPlot, yPlot]);
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
