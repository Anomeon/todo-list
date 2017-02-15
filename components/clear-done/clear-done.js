(() => {
  'use strict';

  let button = document.querySelector('[data-clear-done]');
  componentHandler.upgradeElement(button);

  let setClearButtonState = function() {
    let button = document.querySelector('[data-clear-done]');
    if (Object.keys(storage.getItems('done')).length > 0) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', '');
    }
  };

  setClearButtonState();

  button.addEventListener('click', () => {
    let items = storage.getItems('done');
    storage.deleteItems(Object.keys(items));
    clearList();
    renderList();
    setClearButtonState();
    fireSnackbar('Done tasks deleted');
  });

  window.setClearButtonState = setClearButtonState;

})();
