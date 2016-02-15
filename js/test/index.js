import expect from 'expect';
import subject from '../src/index';

describe('RWRAlt', function () {
  describe('.version', function () {
    it('is present', function () {
      expect(subject.version).toNotEqual(undefined);
    });
  });
});
