import { describe, it, expect } from '@jest/globals';

import { Rogue } from '../../../Classes';

describe('Rogue represents the rogue class of D&D 5', () => {
  describe('Rogue provides a build middleware to create characters of this class', () => {
    it('must set up the CharacterOptions according to the class traits', () => {
      const characterOptions = Rogue.build({});
      expect(characterOptions.classes![0].characterClass).toBe(Rogue);
      expect(characterOptions.classes![0].level).toBe(1);
      expect(characterOptions['hit dice']!.toString()).toBe('1d8');
      expect(
        [...(characterOptions.features ?? [])].map(([_, value]) => value),
      ).toEqual([
        'saving throw bonus for dexterity',
        'saving throw bonus for intelligence',
        'proficiency bonus for light armor',
        'proficiency bonus for simple weapon',
        'proficiency bonus for hand crossbow',
        'proficiency bonus for long sword',
        'proficiency bonus for rapier',
        'proficiency bonus for short sword',
      ]);
    });
  });

  describe('Class also provide a levelUp middleware to update characters features on level up', () => {
    it('must set up the Character according to the class traits', () => {
      throw new Error('not implemented yet');
    });
  });
});
