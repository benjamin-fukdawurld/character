import { describe, it, expect } from '@jest/globals';

import { Warlock } from '../../../Classes';

describe('Warlock represents the warlock class of D&D 5', () => {
  describe('Warlock provides a build middleware to create characters of this class', () => {
    it('must set up the CharacterOptions according to the class traits', () => {
      const characterOptions = Warlock.build({});
      expect(characterOptions.classes![0].characterClass).toBe(Warlock);
      expect(characterOptions.classes![0].level).toBe(1);
      expect(characterOptions['hit dice']!.toString()).toBe('1d8');
      expect(
        [...(characterOptions.features ?? [])].map(([_, value]) => value),
      ).toEqual([
        'saving throw bonus for wisdom',
        'saving throw bonus for charisma',
        'proficiency bonus for light armor',
        'proficiency bonus for simple weapon',
      ]);
    });
  });

  describe('Class also provide a levelUp middleware to update characters features on level up', () => {
    it('must set up the Character according to the class traits', () => {
      throw new Error('not implemented yet');
    });
  });
});
