import {ItemStorage, createStore, getState} from './services'

(() => {
  window.itemStorage = new ItemStorage(localStorage);
  window.getState = getState;

  let badge = window.itemStorage.getItems().length;

  window.reducer = (state = { badge: badge, addedItemId: 0 }, action) => {
    switch (action.type) {
      case 'ADD_ITEM': return { badge: ++state.badge, addedItemId: action.itemId };
      case 'REMOVE_ITEM': return { badge: --state.badge, addedItemId: action.itemId };
      case 'RESET_ITEMS': return { badge: 0 };
      default: return state;
    }
  }

  window.store = createStore(window.reducer);

  window.actions = {
    addItem: id => {
      return { type: 'ADD_ITEM', itemId: id }
    },
    removeItem: id => {
      return { type: 'REMOVE_ITEM', itemId: id }
    },
    resetItems: { type: 'RESET_ITEMS' }
  }
})();
