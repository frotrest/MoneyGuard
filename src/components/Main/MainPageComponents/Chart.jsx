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
import styles from '../mainPage.module.css';
import clsx from 'clsx';

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
          'https://api.exchangerate-api.com/v4/latest/USD'
        );

        const uahRate = res.data.rates.UAH;

        setHistory((prev) =>
          prev.length === 0
            ? [
                uahRate * 0.96,
                uahRate * 0.98,
                uahRate,
                uahRate * 1.02,
                uahRate * 1.04,
              ]
            : [...prev.slice(-4), uahRate]
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
    labels: history.map((_, i) => i),
    datasets: [
      {
        label: 'USD→UAH',
        data: history,
        fill: true,
        borderColor: 'rgba(255, 134, 141, 1)',
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return 'transparent';
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
          title: (context) => `Point ${context[0].dataIndex + 1}`,
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        display: false,
        offset: false,
      },
      y: {
        display: false,
        beginAtZero: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        cubicInterpolationMode: 'monotone',
      },
    },
  };

  return (
    <div className={clsx(styles.chartRates)}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CurrencyChart;
