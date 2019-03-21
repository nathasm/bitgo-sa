export const chartOptions = {
  responsive: true,
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

export const backgroundColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(201, 203, 207, 0.2)',
  'rgba(201, 23, 207, 0.2)',
  'rgba(201, 203, 27, 0.2)',
  'rgba(1, 3, 7, 0.2)',
  'rgba(201, 3, 207, 0.2)'
];

export const borderColors = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)',
  'rgba(201, 23, 207)',
  'rgba(201, 203, 27)',
  'rgba(1, 3, 7)',
  'rgba(201, 3, 207)'
];
