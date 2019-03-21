import React from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
  responsive: true,
  tooltips: {
    mode: 'label'
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          unit: 'second'
        },
        display: true,
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      }
    ],
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        gridLines: {
          display: true
        },
        labels: {
          show: true
        }
      }
    ]
  }
};

export default function Graph(props) {
  const { label, scores } = props;
  const data = {
    datasets: [
      {
        label,
        data: scores
      }
    ]
  };
  return <Bar data={data} options={options} />;
}
