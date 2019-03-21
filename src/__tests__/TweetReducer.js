import reducer from '../TweetReducer';

const mockState = {
  art: [
    {
      x: 'time',
      y: 1
    }
  ]
};
describe('TweetReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle "add" to initialState', () => {
    expect(
      reducer(undefined, {
        type: 'add',
        key: 'art',
        count: 3,
        score: 1,
        time: 'time'
      })
    ).toEqual(mockState);
  });

  it('should handle "add" to existing state', () => {
    expect(
      reducer(mockState, {
        type: 'add',
        key: 'art',
        count: 3,
        score: 2,
        time: 'time'
      })
    ).toEqual({
      art: [
        {
          x: 'time',
          y: 1
        },
        { x: 'time', y: 2 }
      ]
    });
  });

  it('should handle "add" to a new keyword entry', () => {
    expect(
      reducer(mockState, {
        type: 'add',
        key: 'facebook',
        count: 3,
        score: 1,
        time: 'time'
      })
    ).toEqual({ ...mockState, facebook: [{ x: 'time', y: 1 }] });
  });

  it('should handle "add" to an existing new keyword entry', () => {
    const initialState = {
      ...mockState,
      facebook: [{ x: 'time', y: 1 }]
    };
    expect(
      reducer(initialState, {
        type: 'add',
        key: 'facebook',
        count: 3,
        score: 2,
        time: 'time'
      })
    ).toEqual({
      ...mockState,
      facebook: [{ x: 'time', y: 1 }, { x: 'time', y: 2 }]
    });
  });
});
