import { describe, it, expect } from '@jest/globals';

import Weapon, { defaultWeapons } from '../../../Equipment/Weapon';

describe('Weapon represent a weapon in D&D 5', () => {
  describe('it must be constructable with a WeaponOptions', () => {
    it('must be constructable without the optional parameters and returns the expected values', () => {
      const weapon = new Weapon({
        name: 'test',
        type: 'melee weapon',
        category: 'simple weapon',
        weight: 1,
        'weight category': 'light',
        cost: {
          'copper coins': 2,
        },
        damages: {
          'single handed': {
            slashing: '1d4',
          },
        },
        feats: [],
      });
      expect(weapon.name).toBe('test');
      expect(weapon.type).toBe('melee weapon');
      expect(weapon.category).toBe('simple weapon');
      expect(weapon['weight category']).toBe('light');
      expect(weapon.weight).toBe(1);
      expect(weapon.cost).toEqual({
        'copper coins': 2,
      });
      expect(weapon.damages['single handed']?.slashing?.toString()).toEqual(
        '1d4',
      );
      expect(weapon.feats).toEqual([]);
    });

    it('must be constructable with the optional parameters and returns the expected values', () => {
      const weapon = new Weapon({
        name: 'test',
        type: 'melee weapon',
        category: 'simple weapon',
        weight: 1,
        cost: {
          'copper coins': 2,
        },
        damages: {
          'single handed': {
            slashing: '1d4',
          },
          'two handed': {
            slashing: '1d6',
          },
        },
        'grip style': 'versatile',
        'weight category': 'light',
        ammunition: true,
        range: { min: 6, max: 36 },
        throwable: true,
        feats: [],
      });
      expect(weapon.name).toBe('test');
      expect(weapon.type).toBe('melee weapon');
      expect(weapon.category).toBe('simple weapon');
      expect(weapon['weight category']).toBe('light');
      expect(weapon['grip style']).toBe('versatile');
      expect(weapon.ammunition).toBe(true);
      expect(weapon.throwable).toBe(true);
      expect(weapon.range).toEqual({ min: 6, max: 36 });
      expect(weapon.weight).toBe(1);
      expect(weapon.cost).toEqual({
        'copper coins': 2,
      });
      expect(weapon.damages['single handed']?.slashing?.toString()).toEqual(
        '1d4',
      );
      expect(weapon.damages['two handed']?.slashing?.toString()).toEqual('1d6');
      expect(weapon.feats).toEqual([]);
    });
  });

  it('its middleware must add the weapon damage to the current damages', () => {
    const weapon = new Weapon({
      name: 'test',
      type: 'melee weapon',
      category: 'simple weapon',
      weight: 1,
      cost: {
        'copper coins': 2,
      },
      damages: {
        'single handed': {
          slashing: '1d4',
        },
      },
      feats: [],
    });

    let damages = weapon.middleware({});

    expect(damages.slashing).toBeGreaterThanOrEqual(1);
    expect(damages.slashing).toBeLessThanOrEqual(4);

    damages = weapon.middleware({ slashing: 5, bludgeoning: 1 });
    expect(damages.slashing).toBeGreaterThanOrEqual(5);
    expect(damages.slashing).toBeLessThanOrEqual(9);
    expect(damages.bludgeoning).toBeLessThanOrEqual(1);
  });
});
