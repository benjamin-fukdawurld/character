import { describe, it, expect } from '@jest/globals';
import { AbilityName, AbilityNames } from '../../../Abilities';

import { HalfOrc } from '../../../Races';

describe('HalfOrc represents the half-orc race of D&D 5', () => {
  describe('HalfOrc provides a build middleware to create characters of this race', () => {
    it('must set up the CharacterOptions according to the race traits', () => {
      const characterOptions = HalfOrc.build({});
      expect(characterOptions.race).toBe(HalfOrc);
      expect(characterOptions['dark vision']).toBe(HalfOrc['dark vision']);
      expect(characterOptions.speed).toBe(HalfOrc.speed);
      AbilityNames.forEach((ability: AbilityName) => {
        expect(characterOptions[ability]).toEqual(HalfOrc.abilities[ability]);
      });
    });
  });
});
