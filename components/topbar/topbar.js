(() => {
  componentHandler.upgradeElements(document.querySelectorAll('.mdl-layout__tab-ripple-container'));

  let renderBadge = function() {
    let createdItems = storage.getItems('created');
    document.querySelector('[data-badge]').setAttribute('data-badge', Object.keys(createdItems).length);
  }

  window.renderBadge = renderBadge;
})();

