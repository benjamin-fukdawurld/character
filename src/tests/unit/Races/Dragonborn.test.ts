import { describe, it, expect } from '@jest/globals';
import { AbilityName, AbilityNames } from '../../../Abilities';

import { Dragonborn } from '../../../Races';

describe('Dragonborn represents the dragonborn race of D&D 5', () => {
  describe('Dragonborn provides a build middleware to create characters of this race', () => {
    it('must set up the CharacterOptions according to the race traits', () => {
      const characterOptions = Dragonborn.build({});
      expect(characterOptions.race).toBe(Dragonborn);
      expect(characterOptions['dark vision']).toBe(Dragonborn['dark vision']);
      expect(characterOptions.speed).toBe(Dragonborn.speed);
      AbilityNames.forEach((ability: AbilityName) => {
        expect(characterOptions[ability]).toEqual(
          Dragonborn.abilities[ability],
        );
      });
    });
  });
});
