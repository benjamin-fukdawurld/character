import { describe, it, expect } from '@jest/globals';

import { CoinName, Coins } from '../../../common/interfaces';
import { convertCoins } from '../../../common/coins';

describe("Coins are available in several currencies in D&D 5 and each has it's change rate", () => {
  describe('convertCoins converts a number and its input currency to the given output currency', () => {
    it('expect copper conversion to match the expected values for all currencies', () => {
      const args = {
        value: 1,
        from: 'copper coins' as CoinName,
      };

      expect(convertCoins({ ...args, to: 'copper coins' })).toBeCloseTo(1);
      expect(convertCoins({ ...args, to: 'silver coins' })).toBeCloseTo(0.1);
      expect(convertCoins({ ...args, to: 'electrum coins' })).toBeCloseTo(0.02);
      expect(convertCoins({ ...args, to: 'gold coins' })).toBeCloseTo(0.01);
      expect(convertCoins({ ...args, to: 'platinum coins' })).toBeCloseTo(
        0.001,
      );
    });
    it('expect silver conversion to match the expected values for all currencies', () => {
      const args = {
        value: 1,
        from: 'silver coins' as CoinName,
      };

      expect(convertCoins({ ...args, to: 'copper coins' })).toBeCloseTo(10);
      expect(convertCoins({ ...args, to: 'silver coins' })).toBeCloseTo(1);
      expect(convertCoins({ ...args, to: 'electrum coins' })).toBeCloseTo(0.2);
      expect(convertCoins({ ...args, to: 'gold coins' })).toBeCloseTo(0.1);
      expect(convertCoins({ ...args, to: 'platinum coins' })).toBeCloseTo(0.01);
    });
    it('expect electrum conversion to match the expected values for all currencies', () => {
      const args = {
        value: 1,
        from: 'electrum coins' as CoinName,
      };

      expect(convertCoins({ ...args, to: 'copper coins' })).toBeCloseTo(50);
      expect(convertCoins({ ...args, to: 'silver coins' })).toBeCloseTo(5);
      expect(convertCoins({ ...args, to: 'electrum coins' })).toBeCloseTo(1);
      expect(convertCoins({ ...args, to: 'gold coins' })).toBeCloseTo(0.5);
      expect(convertCoins({ ...args, to: 'platinum coins' })).toBeCloseTo(0.05);
    });
    it('expect gold conversion to match the expected values for all currencies', () => {
      const args = {
        value: 1,
        from: 'gold coins' as CoinName,
      };

      expect(convertCoins({ ...args, to: 'copper coins' })).toBeCloseTo(100);
      expect(convertCoins({ ...args, to: 'silver coins' })).toBeCloseTo(10);
      expect(convertCoins({ ...args, to: 'electrum coins' })).toBeCloseTo(2);
      expect(convertCoins({ ...args, to: 'gold coins' })).toBeCloseTo(1);
      expect(convertCoins({ ...args, to: 'platinum coins' })).toBeCloseTo(0.1);
    });

    it('expect platinum conversion to match the expected values for all currencies', () => {
      const args = {
        value: 1,
        from: 'platinum coins' as CoinName,
      };

      expect(convertCoins({ ...args, to: 'copper coins' })).toBeCloseTo(1000);
      expect(convertCoins({ ...args, to: 'silver coins' })).toBeCloseTo(100);
      expect(convertCoins({ ...args, to: 'electrum coins' })).toBeCloseTo(20);
      expect(convertCoins({ ...args, to: 'gold coins' })).toBeCloseTo(10);
      expect(convertCoins({ ...args, to: 'platinum coins' })).toBeCloseTo(1);
    });

    it('expect to receive an input currency if the value is a number', () => {
      expect(() => convertCoins({ value: 1, to: 'copper coins' })).toThrow();
    });
  });

  describe('convertCoins converts Partial<Coins> to the given output currency', () => {
    let value: Partial<Coins> = {
      'copper coins': 1,
      'silver coins': 2,
      'electrum coins': 3,
      'gold coins': 4,
      'platinum coins': 5,
    };

    expect(convertCoins({ value, to: 'copper coins' })).toBeCloseTo(5571);
    expect(convertCoins({ value, to: 'silver coins' })).toBeCloseTo(557.1);
    expect(convertCoins({ value, to: 'electrum coins' })).toBeCloseTo(111.42);
    expect(convertCoins({ value, to: 'gold coins' })).toBeCloseTo(55.71);
    expect(convertCoins({ value, to: 'platinum coins' })).toBeCloseTo(5.571);

    value = {
      'silver coins': 2,
      'gold coins': 4,
    };

    expect(convertCoins({ value, to: 'copper coins' })).toBeCloseTo(420);
    expect(convertCoins({ value, to: 'silver coins' })).toBeCloseTo(42);
    expect(convertCoins({ value, to: 'electrum coins' })).toBeCloseTo(8.4);
    expect(convertCoins({ value, to: 'gold coins' })).toBeCloseTo(4.2);
    expect(convertCoins({ value, to: 'platinum coins' })).toBeCloseTo(0.42);
  });
});
