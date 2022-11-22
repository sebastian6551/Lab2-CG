import './App.css';
import basicLineDrawingAlgorithm from './algorithms/basicLineDrawingAlgorithm.js';
import { useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {

  const initialPoint = useRef('');
  const finalPoint = useRef('');
  const selectedAlgorithm = useRef('');

  const [state, setState] = useState({
    datasets: [
      {
        label: '',
        data: [],
        radius: 8,
        hoverRadius: 4,
        pointStyle: 'rect',
        backgroundColor: '#FF5733',
      },
    ],
  });

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

  const setPreferences = async (event) => {
    if (initialPoint.current.value.length > 0 && finalPoint.current.value.length > 0) {
      event.preventDefault();
      var x0 = initialPoint.current.value.split(',')[0].replace('(', '');
      x0 = parseFloat(x0);
      var y0 = initialPoint.current.value.split(',')[1].replace(')', '');
      y0 = parseFloat(y0);
      var xf = finalPoint.current.value.split(',')[0].replace('(', '');
      xf = parseFloat(xf);
      var yf = finalPoint.current.value.split(',')[1].replace(')', '');
      yf = parseFloat(yf);

      console.log(x0, y0, xf, yf)
      var points = []
      if (selectedAlgorithm.current.value === 'basicLineDrawing') {
        points = transforms(basicLineDrawingAlgorithm([x0, y0], [xf, yf]));
      }

      setState({
        datasets: [
          {
            label: '',
            data: points,
            radius: 8,
            hoverRadius: 4,
            pointStyle: 'rect',
            backgroundColor: '#FF5733',
          },
        ],
      });
    }
  };

  const options = {
    responsive: true,
    aspectRatio: 2,
    
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
        min: -10,
        max: 10,
        position: 'center',
      },
      y: {
        min: -10,
        max: 10,
        position: 'center',
      },
    },
  };

  return (
    <div className="scatter">
      <h1 className="title">Lab 2 CG</h1>
      <div className="space10px"></div>
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
        title="Punto final (x,y)"
        type="text"
        ref={finalPoint}
        placeholder="Punto final (x,y)"
      />
      <span className="spaceRight"></span>
      <select className="select" title="Agoritmo" ref={selectedAlgorithm}>
        <option hidden selected value="noAlgorithmSelected">
          Algoritmo
        </option>
        <option value="basicLineDrawing">
          Algoritmo básico para dibujar lineas
        </option>
      </select>
      <span className="spaceRight"></span>
      <input
        title="Establecer preferencias"
        className="button"
        type="button"
        value="Establecer preferencias"
        onClick={setPreferences}
      />
      <div className="space10px"></div>
      <Scatter options={options} data={state} />
    </div>
  );
}

export default App;
