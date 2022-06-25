import { describe, it, expect } from '@jest/globals';
import { AbilityName, AbilityNames } from '../../../Abilities';

import { Gnome } from '../../../Races';

describe('Gnome represents the gnome race of D&D 5', () => {
  describe('Gnome provides a build middleware to create characters of this race', () => {
    it('must set up the CharacterOptions according to the race traits', () => {
      const characterOptions = Gnome.build({});
      expect(characterOptions.race).toBe(Gnome);
      expect(characterOptions['dark vision']).toBe(Gnome['dark vision']);
      expect(characterOptions.speed).toBe(Gnome.speed);
      AbilityNames.forEach((ability: AbilityName) => {
        expect(characterOptions[ability]).toEqual(Gnome.abilities[ability]);
      });
    });
  });
});
