/* eslint-disable */
import { expect } from 'chai';

import { capitalize } from '../src/utils';


describe('utils', () => {
  describe('@capitalize', () => {
    it('capitalizes the first letter of a string', () => {
      expect(capitalize('foo')).to.equal('Foo');
    })

    it('capitalizes the only letter in a string with length === 1', () => {
      expect(capitalize('f')).to.equal('F');
    })

    it('does not transform a blank string', () => {
      expect(capitalize('')).to.equal('');
    })

    it('returns null if not passed a string', () => {
      expect(capitalize(false)).to.equal(null);
      expect(capitalize()).to.equal(null);
      expect(capitalize(undefined)).to.equal(null);
      expect(capitalize(1)).to.equal(null);
      expect(capitalize({})).to.equal(null);
      expect(capitalize(() => { console.log('foo') })).to.equal(null);
    })
  });
});
