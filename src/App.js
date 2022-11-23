import './App.css';
import basicLineDrawingAlgorithm from './algorithms/basicLineDrawingAlgorithm.js';
import midpointAlgorithm from './algorithms/midpointAlgorithm.js';
import DDAAlgorithm from './algorithms/DDAAlgorithm.js';
import { useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const initialPoint = useRef('');
  const finalPoint = useRef('');
  const selectedAlgorithm = useRef('');
  const gridSize = useRef('');
  const [placeHolder, setPlaceHolder] = useState('Punto final (x,y)');
  
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

      if (selectedAlgorithm.current.value === 'midpoint') {
        var radius = finalPoint.current.value;
        radius = parseFloat(radius);
        points = transforms(midpointAlgorithm([x0, y0], radius));
      } else {
        var xf = finalPoint.current.value.split(',')[0].replace('(', '');
        xf = parseFloat(xf);
        var yf = finalPoint.current.value.split(',')[1].replace(')', '');
        yf = parseFloat(yf);

        switch (selectedAlgorithm.current.value){
          case 'basicLineDrawing':
            points = transforms(basicLineDrawingAlgorithm([x0, y0], [xf, yf]));
            break;
          case 'DDA':
            points = transforms(DDAAlgorithm([x0, y0], [xf, yf]));
            break;          
          default:
        };
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
    var currentValue = finalPoint.current.value;
    event.preventDefault();
    if (selectedAlgorithm.current.value === 'midpoint') {
      setPlaceHolder('Radio');
      finalPoint.current.value = '';
    } else {
      if (!isNaN(currentValue)){
        setPlaceHolder('Punto final (x,y)');
        finalPoint.current.value = "";
      } else {
        finalPoint.current.value = currentValue
      }
    }
  };

  return (
    <div className="app">
      <h1 className="title">Lab 2 CG</h1>
      <div className="space9px"></div>
      <select
        className="select"
        title="Agoritmo"
        ref={selectedAlgorithm}
        onChange={changePlaceHolder}
      >
        <option hidden selected value="noAlgorithmSelected">Algoritmo</option>
        <option value="basicLineDrawing">Algoritmo básico para dibujar líneas</option>
        <option value="DDA">Algoritmo DDA para líneas</option>
        <option value="midpoint">Algoritmo Midpoint para circunferencia</option>
        
      </select>
      <span className="spaceRight"></span>
      <input
        className="textField"
        title="Punto de inicio (x,y)"
        type="text"
        ref={initialPoint}
        placeholder="Punto de inicio (x,y)"
      />
      <span className="spaceRight"></span>
      <input
        className="textField"
        title={placeHolder}
        type="text"
        ref={finalPoint}
        placeholder={placeHolder}
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
