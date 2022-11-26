/* The circle drawing algorithms generate only the points of the first octant. 
This function completes the points of the other seven octants according to the 
eight-symmetry property of the circle.*/
function replicateOctant(pointsArray) {
  var arraySize = pointsArray.length;
  var points = [];
  points = points.concat(pointsArray);
  //Octan 2 (y,x)
  for (let i = 0; i < arraySize; i++) {
    let point = [0, 0];
    point[0] = pointsArray[arraySize - 1 - i][1];
    point[1] = pointsArray[arraySize - 1 - i][0];
    points.push(point);
  }
  /*
  //Octan 3 (y,-x)
  for (let i = 0; i < arraySize; i++) {
    let point = [0, 0];
    point[0] = pointsArray[arraySize - 1 - i][1];
    point[1] = -pointsArray[arraySize - 1 - i][0];
    points.push(point);
  }
  //Octan 4 (x,-y)
  for (let i = 0; i < arraySize; i++) {
    let point = [0, 0];
    point[0] = pointsArray[arraySize - 1 - i][0];
    point[1] = -pointsArray[arraySize - 1 - i][1];
    points.push(point);
  }
  //Octan 5 (-x,-y)
  for (let i = 0; i < arraySize; i++) {
    let point = [0, 0];
    point[0] = -pointsArray[arraySize - 1 - i][0];
    point[1] = -pointsArray[arraySize - 1 - i][1];
    points.push(point);
  }
  //Octan 6 (-y,-x)
  for (let i = 0; i < arraySize; i++) {
    let point = [0, 0];
    point[0] = -pointsArray[arraySize - 1 - i][1];
    point[1] = -pointsArray[arraySize - 1 - i][0];
    points.push(point);
  }
  //Octan 7 (-y,x)
  for (let i = 0; i < arraySize; i++) {
    let point = [0, 0];
    point[0] = -pointsArray[arraySize - 1 - i][1];
    point[1] = pointsArray[arraySize - 1 - i][0];
    points.push(point);
  }
  //Octan 8 (-x,y)
  for (let i = 0; i < arraySize; i++) {
    let point = [0, 0];
    point[0] = -pointsArray[arraySize - 1 - i][0];
    point[1] = pointsArray[arraySize - 1 - i][1];
    points.push(point);
  }
  */
  return points;
}

export default replicateOctant;
