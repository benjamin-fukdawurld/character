import { describe, it, expect } from '@jest/globals';

import Race from '../../../Races/Race';
import { RaceOptions } from '../../../Races/interfaces';
import { CharacterHeightRanges } from '../../../common/interfaces';
import { AbilityName, AbilityNames } from '../../../Abilities';

describe('Race represent a D&D 5 character race', () => {
  describe('Race must be constructible form the mandatory data', () => {
    it('must set default values as expected', () => {
      const options: RaceOptions = {
        name: 'test',
        'size label': 'm',
        abilities: {
          charisma: 1,
          constitution: 2,
          dexterity: 3,
          intelligence: 4,
          strength: 5,
          wisdom: 6,
        },
        languages: ['common'],
        feats: ['any feat'],
      };

      const testRace = new Race(options);
      expect(testRace.name).toBe('test');
      expect(testRace['size label']).toBe('m');
      expect(testRace.abilities.charisma).toBe(1);
      expect(testRace.abilities.constitution).toBe(2);
      expect(testRace.abilities.dexterity).toBe(3);
      expect(testRace.abilities.intelligence).toBe(4);
      expect(testRace.abilities.strength).toBe(5);
      expect(testRace.abilities.wisdom).toBe(6);
      expect(testRace.languages).toEqual(['common']);
      expect(testRace.feats).toEqual(['any feat']);
      expect(testRace['dark vision']).toBe(0);
      expect(testRace['long rest duration']).toBe(8);
      expect(testRace['size range']).toEqual(CharacterHeightRanges.m);
      expect(testRace.speed).toBe(9);
    });

    it('must set members as expected', () => {
      const options: RaceOptions = {
        name: 'test',
        'size label': 'm',
        abilities: {
          charisma: 1,
          constitution: 2,
          dexterity: 3,
          intelligence: 4,
          strength: 5,
          wisdom: 6,
        },
        languages: ['common'],
        feats: ['any feat'],
        'long rest duration': 7,
        'dark vision': 8,
        'size range': {
          min: 9,
          max: 10,
        },
        speed: 11,
      };

      const testRace = new Race(options);
      expect(testRace.name).toBe('test');
      expect(testRace['size label']).toBe('m');
      expect(testRace.abilities.charisma).toBe(1);
      expect(testRace.abilities.constitution).toBe(2);
      expect(testRace.abilities.dexterity).toBe(3);
      expect(testRace.abilities.intelligence).toBe(4);
      expect(testRace.abilities.strength).toBe(5);
      expect(testRace.abilities.wisdom).toBe(6);
      expect(testRace.languages).toEqual(['common']);
      expect(testRace.feats).toEqual(['any feat']);
      expect(testRace['dark vision']).toBe(8);
      expect(testRace['long rest duration']).toBe(7);
      expect(testRace['size range']).toEqual({ min: 9, max: 10 });
      expect(testRace.speed).toBe(11);
    });
  });

  describe('Race must provide the IRace interface', () => {
    const options: RaceOptions = {
      name: 'test',
      'size label': 'm',
      abilities: {
        charisma: 1,
        constitution: 2,
        dexterity: 3,
        intelligence: 4,
        strength: 5,
        wisdom: 6,
      },
      languages: ['common'],
      feats: ['any feat'],
      'long rest duration': 7,
      'dark vision': 8,
      'size range': {
        min: 9,
        max: 10,
      },
      speed: 11,
    };

    const testRace = new Race(options);

    expect(testRace.name).toBe(options.name);
    expect(testRace['size label']).toBe(options['size label']);
    expect(testRace['size range']).toEqual(options['size range']);
    expect(testRace.speed).toBe(options.speed);
    expect(testRace['dark vision']).toBe(options['dark vision']);
    expect(testRace['long rest duration']).toBe(options['long rest duration']);
    expect(testRace.languages).toEqual(options.languages);
    expect(testRace.abilities).toEqual(options.abilities);
    expect(testRace.feats).toEqual(options.feats);
  });

  describe('Race also provide a build middleware to create characters of this race', () => {
    it('must set up the CharacterOptions according to the race traits', () => {
      const testRace = new Race({
        name: 'test',
        'size label': 'm',
        abilities: {
          charisma: 1,
          constitution: 2,
          dexterity: 3,
          intelligence: 4,
          strength: 5,
          wisdom: 6,
        },
        languages: ['common'],
        feats: ['any feat'],
        'long rest duration': 7,
        'dark vision': 8,
        'size range': {
          min: 9,
          max: 10,
        },
        speed: 11,
      });

      const characterOptions = testRace.build({});
      expect(characterOptions.race).toBe(testRace);
      AbilityNames.forEach((name: AbilityName) => {
        expect(characterOptions[name]).toBe(testRace.abilities[name]);
      });
      expect(characterOptions['dark vision']).toBe(testRace['dark vision']);
      expect(characterOptions.speed).toBe(testRace.speed);
    });
  });
});
