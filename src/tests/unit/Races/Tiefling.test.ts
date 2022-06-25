import { describe, it, expect } from '@jest/globals';
import { AbilityName, AbilityNames } from '../../../Abilities';

import { Tiefling } from '../../../Races';

describe('Tiefling represents the tiefling race of D&D 5', () => {
  describe('Tiefling provides a build middleware to create characters of this race', () => {
    it('must set up the CharacterOptions according to the race traits', () => {
      const characterOptions = Tiefling.build({});
      expect(characterOptions.race).toBe(Tiefling);
      expect(characterOptions['dark vision']).toBe(Tiefling['dark vision']);
      expect(characterOptions.speed).toBe(Tiefling.speed);
      AbilityNames.forEach((ability: AbilityName) => {
        expect(characterOptions[ability]).toEqual(Tiefling.abilities[ability]);
      });
    });
  });
});
