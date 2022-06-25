import { describe, it, expect } from '@jest/globals';
import Shield from '../../../Equipment/Shield';

describe('Shield represent a shield in D&D 5', () => {
  it('should be constructable and return the expected values', () => {
    const shield = new Shield({
      'armor class bonus': 2,
      cost: {
        'silver coins': 2,
      },
      name: 'test',
      weight: 5,
      feats: [],
    });
    expect(shield['armor class bonus']).toBe(2);
    expect(shield.cost).toEqual({
      'silver coins': 2,
    });
    expect(shield.name).toBe('test');
    expect(shield.weight).toBe(5);
    expect(shield.feats).toEqual([]);
  });

  it("its middleware should add the shield's ac bonus to the given ac", () => {
    const shield = new Shield({
      'armor class bonus': 2,
      cost: {
        'silver coins': 2,
      },
      name: 'test',
      weight: 5,
      feats: [],
    });
    expect(shield.middleware(0)).toBe(2);
    expect(shield.middleware(10)).toBe(12);
  });
});
