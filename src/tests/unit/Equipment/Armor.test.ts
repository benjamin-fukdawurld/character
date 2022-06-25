import { describe, it, expect } from '@jest/globals';

import Armor from '../../../Equipment/Armor';

describe('An Armor represents a D&D 5 armor and inherits from ArmorPiece', () => {
  describe("Armor's constructor must respect the following constraints", () => {
    it('must be constructible with default values', () => {
      const armor = new Armor({
        name: 'test',
        weight: 1,
        cost: { 'gold coins': 2 },
        feats: [],
        'armor class bonus': 3,
        type: 'light armor',
      });

      expect(armor.name).toBe('test');
      expect(armor.weight).toBe(1);
      expect(armor.cost['gold coins']).toBe(2);
      expect(armor['armor class bonus']).toBe(3);
      expect(armor.type).toBe('light armor');
    });

    it('must be constructible with all given values', () => {
      const armor = new Armor({
        name: 'test',
        weight: 1,
        cost: { 'gold coins': 2 },
        feats: [],
        'armor class bonus': 3,
        type: 'light armor',
        'max dexterity bonus': 2,
        'required strength': 12,
        'stealth disadvantage': true,
        'use dexterity bonus': true,
      });

      expect(armor.name).toBe('test');
      expect(armor.weight).toBe(1);
      expect(armor.cost['gold coins']).toBe(2);
      expect(armor['armor class bonus']).toBe(3);
      expect(armor.type).toBe('light armor');
      expect(armor['max dexterity bonus']).toBe(2);
      expect(armor['required strength']).toBe(12);
      expect(armor['stealth disadvantage']).toBe(true);
      expect(armor['use dexterity bonus']).toBe(true);
    });

    it("must throw an error if 'max dexterity bonus', 'required strength', weight or cost is negative", () => {
      expect(
        () =>
          new Armor({
            name: 'test',
            weight: 1,
            cost: { 'gold coins': 2 },
            feats: [],
            'armor class bonus': 3,
            type: 'light armor',
            'max dexterity bonus': -1,
          }),
      ).toThrow();

      expect(
        () =>
          new Armor({
            name: 'test',
            weight: 1,
            cost: { 'gold coins': 2 },
            feats: [],
            'armor class bonus': 3,
            type: 'light armor',
            'required strength': -2,
          }),
      ).toThrow();

      expect(
        () =>
          new Armor({
            name: 'test',
            weight: -1,
            cost: { 'gold coins': 2 },
            feats: [],
            'armor class bonus': 3,
            type: 'light armor',
          }),
      ).toThrow();

      expect(
        () =>
          new Armor({
            name: 'test',
            weight: 1,
            cost: { 'gold coins': -2 },
            feats: [],
            'armor class bonus': 3,
            type: 'light armor',
          }),
      ).toThrow();
    });
  });

  describe(
    'Armor also provide a middleware to alter the armor class value (assuming the dex' +
      ' modifier is applied)',
    () => {
      describe('depending on the armor type and data it must behave differently', () => {
        it(
          'Armors which do not use the dexterity modifier their mw must return a value equal to' +
            ' 10 + the armor class modifier',
          () => {
            const armor = new Armor({
              name: 'test',
              weight: 1,
              cost: { 'gold coins': 2 },
              feats: [],
              'armor class bonus': 7,
              type: 'light armor',
              'use dexterity bonus': false,
            });

            const mw = armor.middleware;

            expect(mw(10)).toBe(17);
            expect(mw(15)).toBe(17);
            expect(mw(8)).toBe(17);
          },
        );
        it(
          'Armors which use the dexterity modifier their mw must return a value equal to' +
            ' (10 + dex mod) + the armor class modifier',
          () => {
            const armor = new Armor({
              name: 'test',
              weight: 1,
              cost: { 'gold coins': 2 },
              feats: [],
              'armor class bonus': 5,
              type: 'light armor',
              'use dexterity bonus': true,
            });

            const mw = armor.middleware;

            expect(mw(10)).toBe(15);
            expect(mw(15)).toBe(20);
            expect(mw(8)).toBe(13);
          },
        );
        it(
          'Armors which use the dexterity modifier and has a dex modifier max limit their mw must' +
            ' return a value equal to (10 + max(dex mod, limit) + the armor class modifier',
          () => {
            const armor = new Armor({
              name: 'test',
              weight: 1,
              cost: { 'gold coins': 2 },
              feats: [],
              'armor class bonus': 4,
              type: 'light armor',
              'use dexterity bonus': true,
              'max dexterity bonus': 2,
            });

            const mw = armor.middleware;

            expect(mw(10)).toBe(14);
            expect(mw(15)).toBe(16);
            expect(mw(8)).toBe(12);
          },
        );
      });
    },
  );
});
