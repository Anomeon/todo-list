(() => {
  'use strict';

  let button = document.querySelector('[data-clear-done]');
  componentHandler.upgradeElement(button);

  button.addEventListener('click', () => {
    let items = storage.getItems('done');
    storage.deleteItems(Object.keys(items));
    clearList();
    renderList();
    fireSnackbar('Done tasks deleted');
  });

})();
