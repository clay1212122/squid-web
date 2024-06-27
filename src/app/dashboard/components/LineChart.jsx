'use client';
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});
const data = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
  datasets: [
    {
      label: 'Cantidad de Productos AGAVENOL comprados por mes',
      data: [65, 59, 80, 81, 56],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};
const LineChart = () => {
    return (
      <div style={{ width: '700px', height: '700px' }}>
        <Line data={data} />
      </div>
    );
  };
  export default LineChart;