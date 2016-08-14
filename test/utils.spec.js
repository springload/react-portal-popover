/* eslint-disable */
import { expect } from 'chai';

import { capitalize, uniqueId } from '../src/utils';

const checkDuplicates = (generator, count) => {
  const hash = {};
  const dupe = [];
  for (let idx = 0; idx < count; ++idx) {
    let gen = generator(idx); // generate our unique ID

    // if it already exists, then it has been duplicated
    if (typeof hash[gen] != 'undefined') {
      dupe.push({
        duplicate: gen,
        indexCreated: hash[gen],
        indexDuplicated: idx,
        duplicateCount: dupe.filter((cur) => { return cur.duplicate == gen }).length,
      });
    }
    hash[gen] = idx;
  }
  return dupe;
};


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

  describe('@uniqueId', () => {
    it('generates a random string of 32 char length', () => {
      const id = uniqueId();
      expect(id.length).to.equal(32);
    });
    it('is unique in 10,000 iterations', () => {
      const dupe = checkDuplicates(uniqueId, Math.pow(10, 4));
      expect(dupe.length).to.equal(0);
    });
    it('is unique in 100,000 iterations', () => {
      const dupe = checkDuplicates(uniqueId, Math.pow(10, 5));
      expect(dupe.length).to.equal(0);
    });
  });
});
