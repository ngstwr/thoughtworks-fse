import LocalForage from "localforage";

class WebStore {

  constructor() {
    LocalForage.config({
        driver      : [LocalForage.INDEXEDDB, LocalForage.WEBSQL, LocalForage.LOCALSTORAGE],
        name        : 'twFse'
    });
  }

  set(key, value) {
    return LocalForage.setItem(key, value)
            .catch(this._handleError);
  }

  get(key) {
    return LocalForage.getItem(key)
            .catch(this._handleError);
  }

  remove(key) {
    return LocalForage.removeItem(key)
            .catch(this._handleError);
  }

  clear() {
    return LocalForage.clear()
            .catch(this._handleError);
  }

  _handleError(error){
    console.error(error);
  }
}

export let Store = new WebStore();