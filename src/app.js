import {ItemStorage, createStore} from './services'

let storage = new ItemStorage(localStorage);

let getState = function() {
  return window.location.hash.split('#')[1];
};

window.storage = storage;
window.getState = getState;
