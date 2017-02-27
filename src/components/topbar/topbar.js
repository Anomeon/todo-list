(() => {
  'use strict';

  componentHandler
    .upgradeElements(document.querySelectorAll('.mdl-layout__tab-ripple-container'));

  let renderBadge = function() {
    let createdItems = itemStorage.getItems('created');
    document.querySelector('[data-badge]')
      .setAttribute('data-badge', Object.keys(createdItems).length);
  };

  window.store.subscribe(() => {
    renderBadge(window.store.getState().badgeAmount);
  })

  window.renderBadge = renderBadge;
})();
