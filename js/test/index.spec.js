import expect from 'expect';
import subject from '../src/index';

describe('RWRRedux', function () {
  it('has correct properites', function () {
    expect(subject.version).toBeA('string');

    expect(subject.registerStore).toBeA('function');
    expect(subject.mountStore).toBeA('function');
    expect(subject.getStore).toBeA('function');
    expect(subject.storeIntegrationWrapper).toBeA('object');

    expect(subject.registerContainer).toBeA('function');
    expect(subject.containerIntegrationWrapper).toBeA('object');

    expect(subject.registerRoutes).toBeA('function');
    expect(subject.routerIntegrationWrapper).toBeA('object');
  });
});
