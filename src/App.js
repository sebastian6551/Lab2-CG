import './App.css';
import basicLineDrawingAlgorithm from './algorithms/basicLineDrawingAlgorithm.js';
import midpointAlgorithm from './algorithms/midpointAlgorithm.js';
import DDAAlgorithm from './algorithms/DDAAlgorithm.js';
import bresenhamsAlgorithm from './algorithms/bresenhamsAlgorithm.js';
import bresenhamsCircleAlgorithm from './algorithms/bresenhamsCircleAlgorithm.js';
import replicateOctant from './algorithms/auxiliaryFunctions/replicateOctant.js';
import { useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const initialPoint = useRef('');
  const finalPoint = useRef('');
  const selectedAlgorithm = useRef('');
  const gridSize = useRef('');
  const [initialPointCaption, setInitialPointCaption] = useState("Punto de inicio (x,y)");
  const [finalPointCaption, setFinalPointCaption] = useState("Punto final (x,y)");
  
  const [state, setState] = useState({
    datasets: [
      {
        label: '',
        data: [],
        radius: 8,
        hoverRadius: 10,
        pointStyle: 'rect',
        backgroundColor: '#FF5733',
      },
    ],
  });

  const [options, setOptions] = useState(
    //Chart options, initial grid size
    changeOptions(10, 10)
  );

  function changeOptions(sizeX, sizeY){
    return ({
      responsive: true,
      aspectRatio: 2,
      resizeDelay: 0,
      maintainAspectRatio: false,
  
      plugins: {
        title: {
          display: false,
        },
  
        legend: {
          display: false,
        },
      },
  
      scales: {
        x: {
          min: -sizeX,
          max: sizeX,
          position: 'center',
        },
        y: {
          min: -sizeY,
          max: sizeY,
          position: 'center',
        },
      },
    })
  };

  // Transforms the point in list format [x, y] to the chart accepted format
  function transforms(list) {
    var points = [];
    
    for (var i = 0; i < list.length; i++) {
      points.push({
        x: list[i][0],
        y: list[i][1],
      });
    }
    return points;
  }

  function getRadius() {
    var radius = finalPoint.current.value;
    radius = parseFloat(radius);
    return radius;
  }

  function getFinalPoint() {
    var xf = finalPoint.current.value.split(',')[0].replace('(', '');
    xf = parseFloat(xf);
    var yf = finalPoint.current.value.split(',')[1].replace(')', '');
    yf = parseFloat(yf);
    return [xf,yf];
  }

  //Sets the new preferences by pressing the setPreferences button
  const setPreferences = async (event) => {
    event.preventDefault();

    if (gridSize.current.value.length > 0) {
      var x = gridSize.current.value.split(',')[0].replace('(', '');
      x = parseFloat(x);
      var y = gridSize.current.value.split(',')[1].replace(')', '');
      y = parseFloat(y);
      setOptions(changeOptions(x, y));
    }

    if (initialPoint.current.value.length > 0 && finalPoint.current.value.length > 0) {
      var points = [];
      var x0 = initialPoint.current.value.split(',')[0].replace('(', '');
      x0 = parseFloat(x0);
      var y0 = initialPoint.current.value.split(',')[1].replace(')', '');
      y0 = parseFloat(y0);

      switch (selectedAlgorithm.current.value){
        case 'midpoint':
          points = transforms(replicateOctant([x0, y0], midpointAlgorithm(getRadius())));
          break;
        case 'bresenhamsCircle':
          points = transforms(replicateOctant([x0, y0], bresenhamsCircleAlgorithm(getRadius())));
          break;
        case 'basicLineDrawing':
          points = transforms(basicLineDrawingAlgorithm([x0, y0], getFinalPoint()));
          break;
        case 'DDA':
          points = transforms(DDAAlgorithm([x0, y0], getFinalPoint()));
          break;
        case 'bresenhamsLine':
          points = transforms(bresenhamsAlgorithm([x0, y0], getFinalPoint()));
          break;        
          default:
        }

      setState({
        datasets: [
          {
            label: '',
            data: points,
            radius: 8,
            hoverRadius: 10,
            pointStyle: 'rect',
            backgroundColor: '#FF5733',
          },
        ],
      });
    }
  };

  //Changes the finalPoint text field place holder when the selected option changes
  const changePlaceHolder = async (event) => {
    event.preventDefault();
    if (
      selectedAlgorithm.current.value === 'midpoint' ||
      selectedAlgorithm.current.value === 'bresenhamsCircle'
    ) {
      setInitialPointCaption('Centro (x,y)');
      setFinalPointCaption('Radio');
      initialPoint.current.value = '';
      finalPoint.current.value = '';
    } else {
      setInitialPointCaption('Punto de inicio (x,y)');
      setFinalPointCaption('Punto final (x,y)');
    }
  };

  return (
    <div className="app">
      <h1 className="title">Lab 2 CG</h1>
      <div className="space9px"></div>
      <select
        className="select"
        title="Algoritmo"
        ref={selectedAlgorithm}
        onChange={changePlaceHolder}
      >
        <option hidden value="noAlgorithmSelected">Algoritmo</option>
        <option value="basicLineDrawing">Algoritmo de dibujo de líneas básico</option>
        <option value="DDA">Algoritmo de dibujo de líneas DDA</option>
        <option value="bresenhamsLine">Algoritmo de dibujo de líneas de Bresenham</option>
        <option value="midpoint">Algoritmo de dibujo de círculos de punto medio</option>
        <option value="bresenhamsCircle">Algoritmo de dibujo de círculos de Bresenham</option>
      </select>
      <span className="spaceRight"></span>
      <input
        className="textField"
        title={initialPointCaption}
        type="text"
        ref={initialPoint}
        placeholder={initialPointCaption}
      />
      <span className="spaceRight"></span>
      <input
        className="textField"
        title={finalPointCaption}
        type="text"
        ref={finalPoint}
        placeholder={finalPointCaption}
      />
      <span className="spaceRight"></span>
      <input
        className="sizeField"
        title="Tamaño"
        type="text"
        ref={gridSize}
        placeholder="Tamaño (x,y)"
      />
      <span className="spaceRight"></span>
      <input
        title="Establecer preferencias"
        className="button"
        type="button"
        value="Establecer preferencias"
        onClick={setPreferences}
      />
      <div className="space9px"></div>
      <div className="scatter">
      <Scatter options={options} data={state} />
      </div>
    </div>
  );
}

export default App;
