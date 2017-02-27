(() => {
  'use strict';

  let button = document.querySelector('.mdl-js-button');
  let form = document.querySelector('[data-add-form]');
  let input = form.querySelector('[type=text]');

  componentHandler.upgradeElement(document.querySelector('.mdl-js-textfield'));
  componentHandler.upgradeElement(button);

  let fireSnackbar = function(message) {
    let snackbarContainer = document.querySelector('#demo-snackbar-example');
    var data = {
      message: message,
      timeout: 2000
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  };

  let handler = (e) => {
    e.preventDefault();
    let IDCounter = itemStorage.getIDCounter();
    let inputValue = input.value;
    let itemID = parseInt(IDCounter) + 1;
    if (inputValue !== '') {
      let newItem = itemStorage.addItem(inputValue);
      form.reset();
      let state = getState();
      appendItem(newItem, itemID, state);
      window.store.dispatch(actions.addItem(itemID));
      button.setAttribute('disabled', '');
    }
  };

  input.addEventListener('input', () => {
    if (input.value !== '') {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', '');
    }
  });

  window.store.subscribe(() => {
    const {badgeAmount, addedItemId} = window.store.getState();
    renderBadge(badgeAmount);
    fireSnackbar(`Task #${addedItemId} added`);
  })

  form.addEventListener('submit', handler);

  window.fireSnackbar = fireSnackbar;
})();
