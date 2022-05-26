import { Dice } from '@benjamin_fdw/dice';
import { describe, it, expect } from '@jest/globals';

import HealthManager from './HealthManager';
import { HealthAttributeName, HealthAttributeNames } from './interfaces';

describe('An HealthManager should manage the health of character', () => {
  describe('HealthManager constructor must behave as follow', () => {
    it('should be constructible with just a hit dice', () => {
      let manager = new HealthManager({ 'hit dice': '1d6' });
      expect(manager['hit dice'].toString()).toBe('1d6');

      manager = new HealthManager({ 'hit dice': new Dice('1d6') });
      expect(manager['hit dice'].toString()).toBe('1d6');
    });

    it('should set the max hit points as max(hit dice) + constitution modifier', () => {
      expect(new HealthManager({ 'hit dice': '1d6' })['hit point max']).toBe(6);

      expect(
        new HealthManager({ 'hit dice': '1d8', 'constitution bonus': 2 })[
          'hit point max'
        ],
      ).toBe(10);
    });

    it('should set the max hit points as the given value if any and ignore hit dice and constitution', () => {
      expect(
        new HealthManager({ 'hit dice': '1d6', 'hit point max': 20 })[
          'hit point max'
        ],
      ).toBe(20);

      expect(
        new HealthManager({
          'hit dice': '1d8',
          'constitution bonus': 2,
          'hit point max': 20,
        })['hit point max'],
      ).toBe(20);
    });

    it('should set the current hit points as the given value if any or to hit points max', () => {
      expect(
        new HealthManager({ 'hit dice': '1d6', 'hit point max': 20 })[
          'current hit points'
        ],
      ).toBe(20);

      expect(
        new HealthManager({
          'hit dice': '1d8',
          'constitution bonus': 2,
          'hit point max': 20,
          'current hit points': 19,
        })['current hit points'],
      ).toBe(19);
    });

    it('should set the temporary hit points to the given value or set it to 0', () => {
      expect(
        new HealthManager({ 'hit dice': '1d6' })['temporary hit points'],
      ).toBe(0);

      expect(
        new HealthManager({
          'hit dice': '1d8',
          'constitution bonus': 2,
          'temporary hit points': 6,
        })['temporary hit points'],
      ).toBe(6);
    });

    it('should set the total hit dice to the given value or set it to 1', () => {
      expect(new HealthManager({ 'hit dice': '1d6' })['total hit dice']).toBe(
        1,
      );

      expect(
        new HealthManager({
          'hit dice': '1d8',
          'constitution bonus': 2,
          'total hit dice': 2,
        })['total hit dice'],
      ).toBe(2);
    });
  });

  describe('It must be serializable and unserializable', () => {
    const manager = new HealthManager({
      'hit dice': '1d8',
    });
    it('should be serializable to JSON', () => {
      const json = JSON.parse(manager.toJSON());
      HealthAttributeNames.forEach((attr: HealthAttributeName) => {
        if (attr === 'hit dice') {
          expect(json[attr]).toEqual(manager['hit dice'].toString());
        } else {
          expect(json[attr]).toEqual(manager[attr]);
        }
      });
    });
  });
});
