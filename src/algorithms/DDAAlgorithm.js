function DDAAlgorithm(initialPoint, finalPoint) {
  var points = [];
  var xi = initialPoint[0];
  var yi = initialPoint[1];
  var Δy = Math.abs(finalPoint[1] - initialPoint[1]);
  var Δx = Math.abs(finalPoint[0] - initialPoint[0]);
  var step = 0;
  if (Δx > Δy) {
    step = Δx;
  } else {
    step = Δy;
  }
  var xinc = Δx / step;
  var yinc = Δy / step;
  points.push([Math.round(xi), Math.round(yi)]);
  for (var i = 0; i < step; i++) {
    xi += xinc;
    yi += yinc;
    points.push([Math.round(xi), Math.round(yi)]);
  }
  return points;
}

export default DDAAlgorithm;