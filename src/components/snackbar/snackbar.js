(() => {
  'use strict';

  let selector = '[data-snackbar]';
  let el = document.querySelector(selector);
  componentHandler.upgradeElement(el);

  let fireSnackbar = function(message) {
    var data = {
      message: message,
      timeout: 2000
    };
    el.MaterialSnackbar.showSnackbar(data);
  };

  window.store.subscribe(() => {
    fireSnackbar(`Task #${window.store.getState().addedItemId} added`);
  });

  window.fireSnackbar = fireSnackbar;
})();
