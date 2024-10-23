import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const Dashboard = ({ inventory, usageHistory, stockInHistory }) => {
  const inventoryData = {
    labels: inventory.map(item => item.material),
    datasets: [
      {
        data: inventory.map(item => item.quantity),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
      },
    ],
  };

  const usageData = {
    labels: usageHistory.slice(-7).map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: '사용량',
        data: usageHistory.slice(-7).map(item => -item.quantity),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>대시보드</h1>
      <div className="dashboard-grid">
        <div className="chart-container">
          <h2>재고 현황</h2>
          <Pie data={inventoryData} />
        </div>
        <div className="chart-container">
          <h2>최근 7일 사용량 추이</h2>
          <Line data={usageData} />
        </div>
        <div className="summary-container">
          <h2>요약 정보</h2>
          <p>총 재고 품목: {inventory.length}</p>
          <p>총 재고 수량: {inventory.reduce((sum, item) => sum + item.quantity, 0)}</p>
          <p>최근 입고: {stockInHistory.length > 0 ? new Date(stockInHistory[stockInHistory.length - 1].date).toLocaleString() : '없음'}</p>
          <p>최근 사용: {usageHistory.length > 0 ? new Date(usageHistory[usageHistory.length - 1].date).toLocaleString() : '없음'}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
