import { Store } from './WebStore';
import localStorageMock from '../../__mocks__/localStorage';

global.localStorage = localStorageMock;

describe('Store Utilities', () => {
  const key = 'searchObj',
        travelPlanObj = {"bookingType": "return", "destination": {"code": "DEL"}, "origin": {"code": "PNQ"}};

  // Only local storage mock is available at the moment
  Store.setDriver('LOCALSTORAGE');

  it('should save passed object and return a promise, get object for the passed key using a promise', () => {
    expect.assertions(1);
    return Store.set(key, travelPlanObj)
      .then(value => {
        expect(value).toEqual(travelPlanObj);
      });
  });

  it('should return promise while removing an item', () => {
    expect.assertions(1);
    return Store.set(key, travelPlanObj)
      .then(value => {
        Store.remove(key).then(data => {
          expect(data).toBe(true);
        });
      });
  });

});
