export class ItemStorage {
  static setStaticProperties() {
    ItemStorage.instanceCounter = ItemStorage.instanceCounter || 0;
  }

  constructor(storage) {
    ItemStorage.setStaticProperties();

    if (ItemStorage.instanceCounter === 1) {
      throw new Error('ItemStorage already has instance');
    } else {
      if (storage) {
        ++ItemStorage.instanceCounter;
        this.storage = storage;
      } else {
        throw new Error('ItemStorage constructor expected a storage parameter');
      }
    }

    if (!this.getItems()) {
      this.storage.setItem('items', JSON.stringify({}));
    }

    if (!this.getIDCounter()) {
      this.storage.setItem('IDCounter', 0);
    }
  }

  getItems(state) {
    let items = this.storage.getItem('items');
    if (items) {
      if (state) {
        let collection = {};
        items = JSON.parse(items);
        for (let key in items) {
          if (items[key].state === state) { collection[key] = items[key]; }
        }
        return collection;
      } else {
        return JSON.parse(items);
      }
    } else {
      return null;
    }
  }

  deleteItems(itemsArray) {
    let items = this.getItems();
    itemsArray.forEach((id) => {
      delete items[id];
    });
    this.storage.setItem('items', JSON.stringify(items));
  }

  addItem(item) {
    let IDCounter = this.incrementIDCounter();
    let items = this.getItems();
    items[IDCounter] = {content: item, state: 'created'};
    this.storage.setItem('items', JSON.stringify(items));
    return {[IDCounter]: {content: item, state: 'created'}};
  }

  updateItemState(id, state) {
    let items = this.getItems();
    items[id].state = state;
    this.storage.setItem('items', JSON.stringify(items));
  }

  getIDCounter() {
    return this.storage.getItem('IDCounter');
  }

  incrementIDCounter() {
    let IDCounter = this.getIDCounter();
    this.storage.setItem('IDCounter', ++IDCounter);
    return IDCounter;
  }
}
