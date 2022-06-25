import { describe, it, expect } from '@jest/globals';
import { AbilityName, AbilityNames } from '../../../Abilities';

import { HalfElf } from '../../../Races';

describe('HalfElf represents the half-elf race of D&D 5', () => {
  describe('HalfElf provides a build middleware to create characters of this race', () => {
    it('must set up the CharacterOptions according to the race traits', () => {
      const characterOptions = HalfElf.build({});
      expect(characterOptions.race).toBe(HalfElf);
      expect(characterOptions['dark vision']).toBe(HalfElf['dark vision']);
      expect(characterOptions.speed).toBe(HalfElf.speed);
      AbilityNames.forEach((ability: AbilityName) => {
        expect(characterOptions[ability]).toEqual(HalfElf.abilities[ability]);
      });
    });
  });
});
