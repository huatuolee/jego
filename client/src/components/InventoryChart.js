import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryChart = ({ products }) => {
  const data = {
    labels: products.map(p => p.name),
    datasets: [
      {
        label: '재고 수량',
        data: products.map(p => p.quantity),
        backgroundColor: 'rgba(75,192,192,0.6)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '재고 현황',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default InventoryChart;
