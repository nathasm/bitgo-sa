const initialState = {};

// {
//   key: [ { time, score }, { time, score } ]
//   key2: [ { time, score }, { time, score } ]
// }
export default function(state = initialState, action) {
  switch (action.type) {
    case 'add':
      const scores = state[action.key] || [];
      let newState = scores.slice();
      newState.push({ time: action.time, score: action.score });
      return {
        ...state,
        [action.key]: newState
      };
    default:
      return state;
  }
}
