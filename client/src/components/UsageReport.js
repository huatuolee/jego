import React, { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UsageReport = ({ inventory, usageHistory, stockInHistory }) => {
  const [showUsageLog, setShowUsageLog] = useState(false);
  const [showMonthlyReport, setShowMonthlyReport] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const sortedInventory = [...inventory].sort((a, b) => b.quantity - a.quantity);

  const chartData = {
    labels: sortedInventory.map(item => `${item.material} - ${item.type} (${item.thickness}T)`),
    datasets: [
      {
        label: '재고량',
        data: sortedInventory.map(item => item.quantity),
        backgroundColor: sortedInventory.map(item => 
          item.quantity <= 1 ? '#FF3B30' : '#007AFF'
        ),
      },
    ],
  };

  const options = {
    indexAxis: 'y',
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
    animation: {
      duration: 0
    },
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const monthlyReport = useMemo(() => {
    const report = {};
    const targetMonth = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}`;

    [...usageHistory, ...stockInHistory].forEach(log => {
      const logDate = new Date(log.date);
      const logMonth = `${logDate.getFullYear()}-${String(logDate.getMonth() + 1).padStart(2, '0')}`;
      if (logMonth === targetMonth) {
        const key = `${log.material}-${log.type}-${log.thickness}T-${log.sizeHeight}x${log.sizeWidth}`;
        if (!report[key]) {
          report[key] = { usage: 0, stockIn: 0 };
        }
        if (log.quantity > 0) {
          report[key].stockIn += log.quantity;
        } else {
          report[key].usage += Math.abs(log.quantity);
        }
      }
    });

    return report;
  }, [usageHistory, stockInHistory, selectedYear, selectedMonth]);

  return (
    <div className="usage-report">
      <h2>재고 보고서</h2>
      <Bar options={options} data={chartData} />
      <div className="button-group">
        <button onClick={() => setShowUsageLog(!showUsageLog)}>
          {showUsageLog ? '사용 로그 닫기' : '사용 로그 보기'}
        </button>
        <button onClick={() => setShowMonthlyReport(!showMonthlyReport)}>
          {showMonthlyReport ? '월간 보고서 닫기' : '월간 보고서 보기'}
        </button>
      </div>
      {showUsageLog && (
        <div className="usage-log">
          <h3>사용 및 입고 로그</h3>
          {[...usageHistory, ...stockInHistory]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((log, index) => (
              <div key={index} className={`log-entry ${log.quantity > 0 ? 'stock-in' : 'usage'}`}>
                {formatDate(log.date)} - 
                {log.material} - {log.type} - {log.thickness}T - {log.sizeHeight}x{log.sizeWidth} : 
                <span className={log.quantity > 0 ? 'stock-in-text' : 'usage-text'}>
                  {log.quantity > 0 ? `${log.quantity}개 입고` : `${Math.abs(log.quantity)}개 사용`}
                </span>
              </div>
            ))}
        </div>
      )}
      {showMonthlyReport && (
        <div className="monthly-report">
          <h3>월간 사용 및 입고 보고서</h3>
          <div className="date-selector">
            <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>{month}월</option>
              ))}
            </select>
          </div>
          {Object.entries(monthlyReport).map(([key, value], index) => (
            <div key={index} className="monthly-report-item">
              <strong>{key}</strong>
              <div>입고량: {value.stockIn}개</div>
              <div>사용량: {value.usage}개</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsageReport;
