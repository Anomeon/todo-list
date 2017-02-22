export function createStore(reducer, initialState) {
  let state = initialState;
  let callbacks = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    callbacks.forEach(callback => callback());
  };

  const subscribe = callback => {
    callbacks.push(callback);
    return () => callbacks.filter(cb => cb !== callback);
  };

  return { getState, dispatch, subscribe };
}

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + action.amount };
    case 'DECREMENT': return { count: state.count - action.amount };
    case 'RESET': return {count: 0};
    default: return state;
  }
}

const store = createStore(reducer);

const incrementAction = {type: 'INCREMENT', amount: 5};

store.subscribe(() => {console.log(store.getState())})

store.dispatch(incrementAction);
