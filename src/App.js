import React from 'react';
import BarGraph from './BarGraph';
import './App.css';

export default function App(props) {
  const { data } = props;

  let buildGraph = key => {
    const scores = data[key].map(point => {
      return { x: point.time, y: point.score };
    });
    return <BarGraph label={key} scores={scores} />;
  };

  return <div>{Object.keys(data).map(buildGraph)}</div>;
}
