import { Dice } from '@benjamin_fdw/dice';
import { describe, it, expect } from '@jest/globals';
import { AbilityName, AbilityNames } from '../../../Abilities';
import {
  CharacterAttributeName,
  CharacterOptions,
  IBaseCharacter,
} from '../../../Character';

import Class from '../../../Classes/Class';
import { ClassOptions } from '../../../Classes/interfaces';

describe('Class represent a D&D 5 character class', () => {
  describe('Class must be constructible form the mandatory data', () => {
    it("must accept 'hit dice' as string", () => {
      const options: ClassOptions = {
        name: 'test',
        'hit dice': '1d15',
        feats: [],

        levelUp: (value: IBaseCharacter) => value,
      };

      const testClass = new Class(options);
      expect(testClass.name).toBe('test');
      expect(testClass['hit dice'].toString()).toBe('1d15');
    });

    it("must accept 'hit dice' as Dice", () => {
      const options: ClassOptions = {
        name: 'test',
        'hit dice': new Dice('1d15'),
        feats: [],

        levelUp: (value: IBaseCharacter) => value,
      };

      const testClass = new Class(options);
      expect(testClass.name).toBe('test');
      expect(testClass['hit dice'].toString()).toBe('1d15');
    });
  });

  describe('Class must provide the IClass interface', () => {
    const options: ClassOptions = {
      name: 'test',
      'hit dice': new Dice('1d15'),
      feats: ['feat 1', 'feat 2'],

      levelUp: (value: IBaseCharacter) => value,
    };

    const testClass = new Class(options);

    it('must provide a getter for name', () => {
      expect(testClass.name).toBe('test');
    });

    it('must provide a getter for hit dice', () => {
      expect(testClass['hit dice'].toString()).toBe('1d15');
    });

    it('must provide a getter for feats', () => {
      expect(testClass.feats).toEqual(['feat 1', 'feat 2']);
    });
  });

  describe('Class also provide a build middleware to create characters of this class', () => {
    it('must set up the CharacterOptions according to the class traits', () => {
      const testClass = new Class({
        name: 'test',
        'hit dice': '1d15',
        feats: ['feat 1', 'feat 2'],

        levelUp: (value: IBaseCharacter) => value,
      });

      let characterOptions = testClass.build({});
      expect(characterOptions.classes![0].characterClass).toBe(testClass);
      expect(characterOptions.classes![0].level).toBe(1);
      expect(characterOptions['hit dice']!.toString()).toBe('1d15');
      expect(characterOptions.features).toEqual(
        new Map<string, any>([
          ['feat 1', 'feat 1'],
          ['feat 2', 'feat 2'],
        ]),
      );

      const testClass2 = new Class({
        name: 'test',
        'hit dice': '1d15',
        feats: [],

        levelUp: (value: IBaseCharacter) => value,
      });
      const features = new Map<string, any>([
        ['feat 3', 'feat 3'],
        ['feat 4', 'feat 4'],
      ]);
      characterOptions = testClass2.build({
        features,
        classes: [
          {
            characterClass: testClass,
            level: 1,
          },
        ],
      });

      expect(
        characterOptions.classes?.map((info) => info.characterClass),
      ).toEqual([testClass, testClass2]);
      expect(characterOptions.features).toEqual(features);
    });
  });

  describe('Class also provide a levelUp middleware to update characters features on level up', () => {
    it('must update the Character according to the class traits', () => {
      const testClass = new Class({
        name: 'test',
        'hit dice': '1d15',
        feats: ['feat 1', 'feat 2'],

        levelUp: (value: IBaseCharacter) => {
          let { strength, ...abilities } = value.abilities;
          strength += 2;
          value.abilities = {
            strength,
            ...abilities,
          };

          return value;
        },
      });

      const abilities = {
        strength: 1,
        dexterity: 2,
        constitution: 3,
        intelligence: 4,
        charisma: 5,
        wisdom: 6,
      };

      let character: IBaseCharacter = {
        id: 'test',
        abilities,
        getAttribute: (attr: CharacterAttributeName): any | null => {
          if (
            AbilityNames.filter((name: AbilityName) => attr === name).length ===
            0
          ) {
            return null;
          }

          return abilities[attr as AbilityName];
        },
      };

      character = testClass.levelUp(character);

      expect(character.abilities.strength).toBe(3);
    });
  });
});
