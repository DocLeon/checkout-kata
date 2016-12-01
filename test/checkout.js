'use strict';

const expect = require('chai').expect;

const catalogue = {
    A: 50,
    B: 30,
    C: 20,
    D: 15
  };

const lookUpPrice = (sku) => {
  return catalogue[sku] || 0;
};

const discount = (items) => {
  const numberOfA = items.split('').filter((item) => item  === 'A').length;
  if (numberOfA % 3 === 0)
    return 20 * (numberOfA/3);
  return 0;
};

const checkout = (items) => { 
  const subtotal = items.split('')
    .map((item) => lookUpPrice(item))
    .reduce((item, total) => item + total, 0);
  return subtotal - discount(items);
};

describe('checkout', () => {
  describe('1 item in basket', () => {
    [
     {desc: 'empty basket', items: '', expectedCost: 0},
     {desc: 'basket with item A', items: 'A', expectedCost: 50},
     {desc: 'basket with item B', items: 'B', expectedCost: 30},
     {desc: 'basket with item C', items: 'C', expectedCost: 20},
     {desc: 'basket with item D', items: 'D', expectedCost: 15}
    ].map((scenario) => {
      it(`${scenario.desc} costs ${scenario.expectedCost}`, () => {
        expect(checkout(scenario.items)).to.equal(scenario.expectedCost);
      });
    });
  });
  describe('many items in basket', () => {
    it('AA costs 20', () => {
      expect(checkout('AA')).to.equal(100);
    });
  });
  describe('discounts', () => {
    it('AAA costs 130', () => {
      expect(checkout('AAA')).to.equal(130);
    });
    it('AAAAAA costs 260', () => {
      expect(checkout('AAAAAA')).to.equal(260);
    });
  });
});
