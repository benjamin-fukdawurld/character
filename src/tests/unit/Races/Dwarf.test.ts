import { describe, it, expect } from '@jest/globals';
import { AbilityName, AbilityNames } from '../../../Abilities';

import { Dwarf } from '../../../Races';

describe('Dwarf represents the dwarf race of D&D 5', () => {
  describe('Dwarf provides a build middleware to create characters of this race', () => {
    it('must set up the CharacterOptions according to the race traits', () => {
      const characterOptions = Dwarf.build({});
      expect(characterOptions.race).toBe(Dwarf);
      expect(characterOptions['dark vision']).toBe(Dwarf['dark vision']);
      expect(characterOptions.speed).toBe(Dwarf.speed);
      AbilityNames.forEach((ability: AbilityName) => {
        expect(characterOptions[ability]).toEqual(Dwarf.abilities[ability]);
      });
    });
  });
});
