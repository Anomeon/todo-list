import {ItemStorage,
        createStore,
        getState,
        handleDisabled,
        slice} from './services'

(() => {
  window.itemStorage = new ItemStorage(localStorage);
  window.getState = getState;
  window.handleDisabled = handleDisabled;
  window.slice = slice;

  let badge = window.itemStorage.getItems().length;

  window.reducer = (state = { badge: badge, addedItemId: 0, state: getState() }, action) => {
    switch (action.type) {
      case 'ADD_ITEM': return { badge: ++state.badge, addedItemId: action.itemId };
      case 'REMOVE_ITEM': return { badge: --state.badge, addedItemId: action.itemId };
      case 'RESET_ITEMS': return { badge: 0 };
      case 'APP_STATE': return { state: action.state };
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
    resetItems: {
      type: 'RESET_ITEMS'
    },
    appStateChanged: {
      type: 'APP_STATE',
      state: getState()
    }
  }
})();
