import { describe, it, expect } from '@jest/globals';

import { Wizard } from '../../../Classes';

describe('Wizard represents the wizard class of D&D 5', () => {
  describe('Wizard provides a build middleware to create characters of this class', () => {
    it('must set up the CharacterOptions according to the class traits', () => {
      const characterOptions = Wizard.build({});
      expect(characterOptions.classes![0].characterClass).toBe(Wizard);
      expect(characterOptions.classes![0].level).toBe(1);
      expect(characterOptions['hit dice']!.toString()).toBe('1d6');
      expect(
        [...(characterOptions.features ?? [])].map(([_, value]) => value),
      ).toEqual([
        'saving throw bonus for intelligence',
        'saving throw bonus for wisdom',
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
