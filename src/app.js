import {ItemStorage, createStore, getState} from './services'

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + action.amount };
    case 'DECREMENT': return { count: state.count - action.amount };
    case 'RESET': return {count: 0};
    default: return state;
  }
}

window.store = createStore(reducer);
window.itemStorage = new ItemStorage(localStorage);
window.getState = getState;

const incrementAction = {type: 'INCREMENT', amount: 5};
window.store.subscribe(() => {console.log(store.getState())})
window.store.dispatch(incrementAction);
