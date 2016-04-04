import expect, { spyOn } from 'expect';
import { createStore } from 'redux';

import subject from '../../src/integrations/redux-store';

const fakeReducer = function () {};
const validStore = function (initialState) {
  return createStore(fakeReducer, initialState);
};

describe('ReduxStore', function () {
  afterEach(function () {
    subject.registeredStores = {};
    subject.mountedStores = {};
    subject.defaultStore = null;

    expect.restoreSpies();
  });

  describe('.constructor', function () {
    it('intializes empty registeredStores and mountedStores dictionaries', function () {
      expect(subject.registeredStores).toEqual({});
      expect(subject.mountedStores).toEqual({});
      expect(subject.defaultStore).toEqual(null);
    });
  });

  describe('#registerStore', function () {
    it('throws an error when there is invalid store', function () {
      expect(function () {
        const invalidStore = {};
        subject.registerStore('InvalidStore', invalidStore);
      })
      .toThrow(/Error when registering 'InvalidStore' store: must be a function./);
    });

    it('adds valid store to the storage', function () {
      subject.registerStore('ValidStore', validStore);

      expect(subject.registeredStores.ValidStore).toBe(validStore);
    });
  });

  describe('#mountStore', function () {
    it('throws an error when store is not a function', function () {
      expect(function () {
        subject.mountStore('InvalidStore', {});
      })
      .toThrow(/Error when mounting 'InvalidStore' store: must be a function./);
    });
  });

  describe('#getStore', function () {
    it('returns undefined if store is not found', function () {
      expect(subject.getStore('FakeStore')).toBe(undefined);
    });

    it('returns store by name from mountedStores storage', function () {
      subject.registerStore('ValidStore', validStore);
      subject.mountStore('ValidStore', {});
      expect(subject.getStore('ValidStore')).toEqual(validStore({}));
    });

    it('returns default store when store\'s name is not given', function () {
      subject.registerStore('ValidStore', validStore);
      subject.mountStore('ValidStore', {});

      expect(subject.getStore()).toEqual(validStore({}));
    });
  });

  describe('#integrationWrapper', function () {
    const payload = { name: 'StoreName', props: { fake: 'props' } };

    describe('mount', function () {
      it('calls #mountStore', function () {
        const { name, props } = payload;
        const mountStoreSpy = spyOn(subject, 'mountStore');
        subject.integrationWrapper.mount('', payload);

        expect(mountStoreSpy.calls.length).toEqual(1);
        expect(mountStoreSpy).toHaveBeenCalledWith(name, props);
      });
    });

    describe('nodeRun', function () {
      it('calls #mountStore', function () {
        const { name, props } = payload;
        const mountStoreSpy = spyOn(subject, 'mountStore');
        subject.integrationWrapper.nodeRun(payload);

        expect(mountStoreSpy.calls.length).toEqual(1);
        expect(mountStoreSpy).toHaveBeenCalledWith(name, props);
      });
    });
  });
});
