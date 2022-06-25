import { describe, it, expect } from '@jest/globals';

import { Druid } from '../../../Classes';

describe('Druid represents the bard class of D&D 5', () => {
  describe('Druid provides a build middleware to create characters of this class', () => {
    it('must set up the CharacterOptions according to the class traits', () => {
      const characterOptions = Druid.build({});
      expect(characterOptions.classes![0].characterClass).toBe(Druid);
      expect(characterOptions.classes![0].level).toBe(1);
      expect(characterOptions['hit dice']!.toString()).toBe('1d8');
      expect(
        [...(characterOptions.features ?? [])].map(([_, value]) => value),
      ).toEqual([
        'saving throw bonus for intelligence',
        'saving throw bonus for wisdom',
        'proficiency bonus for light armor (non metal)',
        'proficiency bonus for medium armor (non metal)',
        'proficiency bonus for shields (non metal)',
        'proficiency bonus for druid weapons',
        'herbalism kit',
        'choose 2 druid skills',
      ]);
    });
  });

  describe('Class also provide a levelUp middleware to update characters features on level up', () => {
    it('must set up the Character according to the class traits', () => {
      throw new Error('not implemented yet');
    });
  });
});
