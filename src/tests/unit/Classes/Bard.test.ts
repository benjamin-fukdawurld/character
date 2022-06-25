import { describe, it, expect } from '@jest/globals';

import { Bard } from '../../../Classes';

describe('Bard represents the bard class of D&D 5', () => {
  describe('Bard provides a build middleware to create characters of this class', () => {
    it('must set up the CharacterOptions according to the class traits', () => {
      const characterOptions = Bard.build({});
      expect(characterOptions.classes![0].characterClass).toBe(Bard);
      expect(characterOptions.classes![0].level).toBe(1);
      expect(characterOptions['hit dice']!.toString()).toBe('1d8');
      expect(
        [...(characterOptions.features ?? [])].map(([_, value]) => value),
      ).toEqual([
        'saving throw bonus for dexterity',
        'saving throw bonus for charisma',
        'proficiency bonus for light armor',
        'proficiency bonus for simple weapon',
        'proficiency bonus for hand crossbow',
        'proficiency bonus for long sword',
        'proficiency bonus for rapier',
        'proficiency bonus for short sword',
        'choose any three',
        'three musical instruments',
      ]);
    });
  });

  describe('Class also provide a levelUp middleware to update characters features on level up', () => {
    it('must set up the Character according to the class traits', () => {
      throw new Error('not implemented yet');
    });
  });
});
