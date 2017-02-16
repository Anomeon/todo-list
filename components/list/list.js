(() => {
  'use strict';

  let listItemTemplate = document.querySelector('[data-template-list-item]');

  let appendItem = function(items, id, state) {
    state = state || 'all';
    let templateContent = listItemTemplate.content.cloneNode(true);
    let li = templateContent.querySelector('li');
    let list = document.querySelector(`[data-list][hash="${state}"]`);
    li.setAttribute('data-item', id);
    if (items[id].state === 'done') {
      li.classList.add('list__element--done');
    }
    templateContent
      .querySelector('.mdl-list__item-primary-content')
      .textContent = '#' + id + ' ' + items[id].content;

    list.appendChild(document.importNode(templateContent, true));

    let item = list.querySelector(`[data-item="${id}"]`);
    item.querySelector('button').addEventListener('click', (e) => {
      e.preventDefault();
      item.classList.add('list__element--done');
      storage.updateItemState(id, 'done');
      renderBadge();
      setClearButtonState();
    });
  };

  let renderList = function(state) {
    if (!state) {
      state = getState();
      if (state === 'all') { state = ''; }
    }
    let items = storage.getItems(state);
    for (let id in items) {
      appendItem(items, id, state);
    }
  };

  let clearList = function() {
    Array.prototype.slice
      .call(document.querySelector(`[data-list][hash="${getState()}"]`).children)
      .forEach(child => child.remove());
  };

  document.querySelector('[src="/components/list/list.html"]')
    .addEventListener('load', () => {
      // renderList();
      renderBadge();
    });

  // window.addEventListener('hashchange', () => {
  //   clearList();
  //   renderList();
  // });

  document.querySelector('[hash="created"]').addEventListener('show', e => {
    clearList();
    renderList('created');
  });

  document.querySelector('[hash="done"]').addEventListener('show', e => {
    clearList();
    renderList('done');
  });

  document.querySelector('[hash="all"]').addEventListener('show', e => {
    clearList();
    renderList('all');
  });

  window.appendItem = appendItem;
  window.renderList = renderList;
  window.clearList = clearList;
})();
