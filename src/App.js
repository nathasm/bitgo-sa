import io from 'socket.io-client';

import React, { useEffect, useReducer } from 'react';
import BarApp from './BarApp';
import TweetReducer from './TweetReducer';

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

  return <BarApp data={state} />;
}
