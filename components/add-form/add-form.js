(() => {
  let button = document.querySelector('.mdl-js-button')
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
  }

  let handler = (e) => {
    e.preventDefault();
    let IDCounter = storage.getIDCounter();
    let inputValue = input.value;
    let itemID = parseInt(IDCounter) + 1;
    if (inputValue !== "") {
      let newItem = storage.addItem(inputValue);
      form.reset();
      fireSnackbar(`Task #${itemID} added`);
      let state = getState();
      appendItem(newItem, itemID, state);
      renderBadge();
    }
  }

  input.addEventListener('input', (e) => {
    if (input.value !== "") {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', '');
    }
  });

  form.addEventListener('submit', handler);

  window.fireSnackbar = fireSnackbar
})();
