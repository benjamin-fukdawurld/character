import { describe, it, expect } from '@jest/globals';

import { Paladin } from '../../../Classes';

describe('Paladin represents the paladin class of D&D 5', () => {
  describe('Paladin provides a build middleware to create characters of this class', () => {
    it('must set up the CharacterOptions according to the class traits', () => {
      const characterOptions = Paladin.build({});
      expect(characterOptions.classes![0].characterClass).toBe(Paladin);
      expect(characterOptions.classes![0].level).toBe(1);
      expect(characterOptions['hit dice']!.toString()).toBe('1d10');
      expect(
        [...(characterOptions.features ?? [])].map(([_, value]) => value),
      ).toEqual([
        'saving throw bonus for wisdom',
        'saving throw bonus for charisma',
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
