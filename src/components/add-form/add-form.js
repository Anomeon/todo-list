(() => {
  'use strict';

  let button = document.querySelector('.mdl-js-button');
  let form = document.querySelector('[data-add-form]');
  let input = form.querySelector('[type=text]');

  componentHandler.upgradeElement(document.querySelector('.mdl-js-textfield'));
  componentHandler.upgradeElement(button);

  let handleSubmit = (e) => {
    e.preventDefault();
    let IDCounter = itemStorage.getIDCounter();
    let inputValue = input.value;
    let itemID = parseInt(IDCounter) + 1;
    let newItem = itemStorage.addItem(inputValue);
    let state = getState();

    appendItem(newItem, itemID, state);

    button.setAttribute('disabled', '');
    form.reset();
    window.store.dispatch(actions.addItem(itemID));
  };

  handleDisabled('input', input, button);
  form.addEventListener('submit', handleSubmit);

})();
