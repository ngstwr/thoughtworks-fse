let localStorage = {};

export default {
    setItem(key, value) {
      return new Promise(
        function (resolve, reject) {
          try {
            Object.assign(localStorage, {[key]: value});
            resolve(localStorage[key]);
          } catch (error) {
            reject(error);
          }
        }
      );
    },
    getItem(key) {
      return new Promise(
        function (resolve, reject) {
          try {
            resolve(localStorage[key]);
          } catch (error) {
            reject(error);
          }
        }
      );
    },
    removeItem(key) {
      return new Promise(
        function (resolve, reject) {
          try {
            delete localStorage[key];
            resolve(true);
          } catch (error) {
            reject(error);
          }
        }
      );
    },
    clear() {
      return new Promise(
        function (resolve, reject) {
          try {
            localStorage = {};
            resolve(true);
          } catch (error) {
            reject(error);
          }
        }
      );
    }
};