(() => {
  'use strict';

  componentHandler
    .upgradeElements(document.querySelectorAll('.mdl-layout__tab-ripple-container'));

  window.store.subscribe(() => {console.log(store.getState())})

  let renderBadge = function() {
    let createdItems = itemStorage.getItems('created');
    document.querySelector('[data-badge]')
      .setAttribute('data-badge', Object.keys(createdItems).length);
  };

  window.renderBadge = renderBadge;
})();
