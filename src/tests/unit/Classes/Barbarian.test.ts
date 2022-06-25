import { describe, it, expect } from '@jest/globals';

import { Barbarian } from '../../../Classes';

describe('Barbarian represents the barbarian class of D&D 5', () => {
  describe('Barbarian provides a build middleware to create characters of this class', () => {
    it('must set up the CharacterOptions according to the class traits', () => {
      const characterOptions = Barbarian.build({});
      expect(characterOptions.classes![0].characterClass).toBe(Barbarian);
      expect(characterOptions.classes![0].level).toBe(1);
      expect(characterOptions['hit dice']!.toString()).toBe('1d12');
      expect(
        [...(characterOptions.features ?? [])].map(([_, value]) => value),
      ).toEqual([
        'saving throw bonus for strength',
        'saving throw bonus for constitution',
        'proficiency bonus for shields',
        'proficiency bonus for light armor',
        'proficiency bonus for medium armor',
        'proficiency bonus for simple weapon',
        'proficiency bonus for martial weapon',
        'choose to skills for barbarian',
      ]);
    });
  });

  describe('Class also provide a levelUp middleware to update characters features on level up', () => {
    it('must set up the Character according to the class traits', () => {
      throw new Error('not implemented yet');
    });
  });
});
