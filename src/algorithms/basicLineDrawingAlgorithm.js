function basicLineDrawingAlgorithm(initialPoint, finalPoint) {
  var points = [];
  var xInc = 1;
  var xi = initialPoint[0];
  var yi = initialPoint[1];
  points.push([xi, yi]);

  var Δy = Math.abs(finalPoint[1] - initialPoint[1]);
  var Δx = Math.abs(finalPoint[0] - initialPoint[0]);

  var m = Δy / Δx;

  for (var i = 0; i < Δx; i++) {
    yi = initialPoint[1] + m * xInc;
    xInc++;
    xi++;
    points.push([xi, Math.round(yi)]);
  }
  return points;
}

export default basicLineDrawingAlgorithm;