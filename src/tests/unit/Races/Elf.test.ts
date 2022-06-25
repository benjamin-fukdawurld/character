import { describe, it, expect } from '@jest/globals';
import { AbilityName, AbilityNames } from '../../../Abilities';

import { Elf } from '../../../Races';

describe('Elf represents the elf race of D&D 5', () => {
  describe('Elf provides a build middleware to create characters of this race', () => {
    it('must set up the CharacterOptions according to the race traits', () => {
      const characterOptions = Elf.build({});
      expect(characterOptions.race).toBe(Elf);
      expect(characterOptions['dark vision']).toBe(Elf['dark vision']);
      expect(characterOptions.speed).toBe(Elf.speed);
      AbilityNames.forEach((ability: AbilityName) => {
        expect(characterOptions[ability]).toEqual(Elf.abilities[ability]);
      });
    });
  });
});
