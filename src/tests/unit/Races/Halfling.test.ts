import { describe, it, expect } from '@jest/globals';
import { AbilityName, AbilityNames } from '../../../Abilities';

import { Halfling } from '../../../Races';

describe('Halfling represents the halfling race of D&D 5', () => {
  describe('Halfling provides a build middleware to create characters of this race', () => {
    it('must set up the CharacterOptions according to the race traits', () => {
      const characterOptions = Halfling.build({});
      expect(characterOptions.race).toBe(Halfling);
      expect(characterOptions['dark vision']).toBe(Halfling['dark vision']);
      expect(characterOptions.speed).toBe(Halfling.speed);
      AbilityNames.forEach((ability: AbilityName) => {
        expect(characterOptions[ability]).toEqual(Halfling.abilities[ability]);
      });
    });
  });
});
