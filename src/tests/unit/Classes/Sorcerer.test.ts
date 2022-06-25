import { describe, it, expect } from '@jest/globals';

import { Sorcerer } from '../../../Classes';

describe('Sorcerer represents the sorcerer class of D&D 5', () => {
  describe('Sorcerer provides a build middleware to create characters of this class', () => {
    it('must set up the CharacterOptions according to the class traits', () => {
      const characterOptions = Sorcerer.build({});
      expect(characterOptions.classes![0].characterClass).toBe(Sorcerer);
      expect(characterOptions.classes![0].level).toBe(1);
      expect(characterOptions['hit dice']!.toString()).toBe('1d6');
      expect(
        [...(characterOptions.features ?? [])].map(([_, value]) => value),
      ).toEqual([
        'saving throw bonus for constitution',
        'saving throw bonus for charisma',
        'proficiency bonus for dagger',
        'proficiency bonus for dart',
        'proficiency bonus for sling',
        'proficiency bonus for quarterstaff',
        'proficiency bonus for light crossbow',
      ]);
    });
  });

  describe('Class also provide a levelUp middleware to update characters features on level up', () => {
    it('must set up the Character according to the class traits', () => {
      throw new Error('not implemented yet');
    });
  });
});
