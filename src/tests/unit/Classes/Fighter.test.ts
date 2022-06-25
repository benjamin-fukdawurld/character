import { describe, it, expect, test } from '@jest/globals';

import { Fighter } from '../../../Classes';

describe('Fighter represents the figther class of D&D 5', () => {
  describe('Fighter provides a build middleware to create characters of this class', () => {
    it('must set up the CharacterOptions according to the class traits', () => {
      const characterOptions = Fighter.build({});
      expect(characterOptions.classes![0].characterClass).toBe(Fighter);
      expect(characterOptions.classes![0].level).toBe(1);
      expect(characterOptions['hit dice']!.toString()).toBe('1d10');
      expect(
        [...(characterOptions.features ?? [])].map(([_, value]) => value),
      ).toEqual([
        'saving throw bonus for strength',
        'saving throw bonus for constitution',
        'proficiency bonus for all armor',
        'proficiency bonus for shields',
        'proficiency bonus for simple weapon',
        'proficiency bonus for martial weapon',
      ]);
    });
  });

  describe('Class also provide a levelUp middleware to update characters features on level up', () => {
    it('must set up the Character according to the class traits', () => {
      throw new Error('not implemented yet');
    });
  });
});
