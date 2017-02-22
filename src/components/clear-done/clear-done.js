(() => {
  'use strict';

  let button = document.querySelector('[data-clear-done]');
  componentHandler.upgradeElement(button);

  let setClearButtonState = function() {
    let button = document.querySelector('[data-clear-done]');
    if (Object.keys(itemStorage.getItems('done')).length > 0) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', '');
    }
  };

  setClearButtonState();

  button.addEventListener('click', () => {
    let items = itemStorage.getItems('done');
    itemStorage.deleteItems(Object.keys(items));
    clearList();
    renderList();
    setClearButtonState();
    fireSnackbar('Done tasks deleted');
  });

  window.setClearButtonState = setClearButtonState;

})();
