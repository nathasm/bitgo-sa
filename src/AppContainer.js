import io from 'socket.io-client';

import React, { useEffect, useReducer } from 'react';
import BarApp from './BarApp';
import TweetReducer from './TweetReducer';

export default function AppContainer(props) {
  const socket = io();
  let [state, dispatch] = useReducer(TweetReducer, {});

  useEffect(() => {
    socket.on('data', data => {
      Object.keys(data).forEach(key => {
        dispatch({ type: 'add', ...data[key] });
      });
    });

    return () => {
      socket.disconnect();
    };
  });

  return <BarApp data={state} />;
}
