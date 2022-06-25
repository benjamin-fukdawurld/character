import { describe, it, expect } from '@jest/globals';

import { Cleric } from '../../../Classes';

describe('Cleric represents the bard class of D&D 5', () => {
  describe('Cleric provides a build middleware to create characters of this class', () => {
    it('must set up the CharacterOptions according to the class traits', () => {
      const characterOptions = Cleric.build({});
      expect(characterOptions.classes![0].characterClass).toBe(Cleric);
      expect(characterOptions.classes![0].level).toBe(1);
      expect(characterOptions['hit dice']!.toString()).toBe('1d8');
      expect(
        [...(characterOptions.features ?? [])].map(([_, value]) => value),
      ).toEqual([
        'saving throw bonus for wisdom',
        'saving throw bonus for charisma',
        'proficiency bonus for shields',
        'proficiency bonus for light armor',
        'proficiency bonus for medium armor',
        'proficiency bonus for simple weapon',
        'pick 2 cleric skills',
      ]);
    });
  });

  describe('Class also provide a levelUp middleware to update characters features on level up', () => {
    it('must set up the Character according to the class traits', () => {
      throw new Error('not implemented yet');
    });
  });
});
