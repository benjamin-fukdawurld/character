import { describe, it, expect } from '@jest/globals';
import { AbilityName, AbilityNames } from '../../../Abilities';

import { Human } from '../../../Races';

describe('Human represents the human race of D&D 5', () => {
  describe('Human provides a build middleware to create characters of this race', () => {
    it('must set up the CharacterOptions according to the race traits', () => {
      const characterOptions = Human.build({});
      expect(characterOptions.race).toBe(Human);
      expect(characterOptions['dark vision']).toBe(Human['dark vision']);
      expect(characterOptions.speed).toBe(Human.speed);
      AbilityNames.forEach((ability: AbilityName) => {
        expect(characterOptions[ability]).toEqual(Human.abilities[ability]);
      });
    });
  });
});
