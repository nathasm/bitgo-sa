import io from 'socket.io-client';

import React, { useEffect, useReducer } from 'react';
import { Line } from 'react-chartjs-2';
import TweetReducer from './TweetReducer';

import { chartOptions, backgroundColors, borderColors } from './GraphConfig';

export default function AppContainer(props) {
  let [state, dispatch] = useReducer(TweetReducer, {});

  useEffect(() => {
    const socket = io();
    socket.on('data', data => {
      Object.keys(data).forEach(key => {
        dispatch({ type: 'add', ...data[key] });
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  let chartData = {
    datasets: []
  };

  let updateChart = state => {
    Object.keys(state).forEach((key, index) => {
      chartData.datasets[index] = {
        backgroundColor: backgroundColors[index],
        borderColor: borderColors[index],
        data: state[key],
        label: key
      };
    });
  };

  return (
    <Line data={chartData} options={chartOptions}>
      {updateChart(state)}
    </Line>
  );
}
