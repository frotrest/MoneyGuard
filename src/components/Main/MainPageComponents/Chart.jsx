import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

const CurrencyChart = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get(
          'https://api.freecurrencyapi.com/v1/latest',
          {
            params: {
              apikey: 'fca_live_GMPU66T3x9xtDWwrmyzkdHEn86CRD6KBjV2jqlub',
              base_currency: 'USD',
              currencies: 'RUB',
            },
          }
        );

        const rubRate = res.data.data.RUB;

        setHistory((prev) =>
          prev.length === 0
            ? [
                rubRate * 0.96,
                rubRate * 0.98,
                rubRate,
                rubRate * 1.02,
                rubRate * 1.04,
              ]
            : [...prev.slice(-4), rubRate]
        );
      } catch (error) {
        console.log('Error while receiving rates:', error);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 10800000);
    return () => clearInterval(interval);
  }, []);

  if (history.length === 0) return null;

  const data = {
    datasets: [
      {
        label: 'USD→UAH',
        data: history.map((rate, i) => ({ x: i, y: rate })),
        fill: true,
        borderColor: 'rgba(255, 134, 141, 1)',
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = canvasCtx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0.09, 'rgba(255, 255, 255, 0.6)');
          gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.32)');
          gradient.addColorStop(0.57, 'rgba(255, 255, 255, 0.16)');
          gradient.addColorStop(0.69, 'rgba(255, 255, 255, 0.09)');
          gradient.addColorStop(0.87, 'rgba(255, 255, 255, 0)');
          gradient.addColorStop(1, 'rgba(57, 0, 150, 0.2)');
          return gradient;
        },
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(255, 134, 141, 1)',
        pointRadius: 8,
        pointHoverRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    clip: false,
    layout: {
      padding: {
        left: 8,
        right: 8,
        top: 10,
        bottom: 0,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        titleFont: { size: 16, family: 'Poppins' },
        bodyFont: { size: 14, weight: 'normal', family: 'Poppins' },
        backgroundColor: 'rgba(57, 0, 150, 0.9)',
        titleColor: '#fff',
        bodyColor: '#ff868d',
        borderColor: '#ff868d',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `Rate: ${context.parsed.y}`,
          title: (context) => `Point ${context[0].parsed.x + 1}`,
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        display: false,
        offset: false,
        min: 0,
        max: history.length - 1,
      },
      y: {
        display: false,
        beginAtZero: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return (
    <div style={{ width: 480, height: 180, overflow: 'hidden' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CurrencyChart;
