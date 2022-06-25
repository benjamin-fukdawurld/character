import { describe, it, expect } from '@jest/globals';
import { InfoManager } from '../../../Info';
import { Elf } from '../../../Races';
import { Barbarian, Rogue } from '../../../Classes';

describe('InfoManager class holds the information about a character', () => {
  describe("InfoManager's constructor must fulfill the following constraints", () => {
    it('must be constructible using default parameters', () => {
      const infoMgr = new InfoManager({
        name: 'test',
        gender: 'male',
        alignment: 'N',
        classes: [{ characterClass: Rogue, level: 1 }],
        race: Elf,
      });

      expect(infoMgr.name).toBe('test');
      expect(infoMgr.gender).toBe('male');
      expect(infoMgr.alignment).toBe('N');
      expect(infoMgr.classes).toEqual([{ characterClass: Rogue, level: 1 }]);
      expect(infoMgr.race).toBe(Elf);

      expect(infoMgr['experiences points']).toBe(0);
      expect(infoMgr.size).toBe(1.65);
      expect(infoMgr.weight).toBe(65);
      expect(infoMgr.biography).toBe('');
    });

    it('must be constructible using all parameters', () => {
      const infoMgr = new InfoManager({
        name: 'test 2',
        gender: 'female',
        alignment: 'LG',
        classes: [{ characterClass: Rogue, level: 1 }],
        race: Elf,
        'experiences points': 113,
        age: 17,
        biography: 'somebody must have lived some life',
        size: 1.75,
        weight: 75,
      });

      expect(infoMgr.name).toBe('test 2');
      expect(infoMgr.gender).toBe('female');
      expect(infoMgr.alignment).toBe('LG');
      expect(infoMgr.classes).toEqual([{ characterClass: Rogue, level: 1 }]);
      expect(infoMgr.race).toBe(Elf);

      expect(infoMgr['experiences points']).toBe(113);
      expect(infoMgr.size).toBe(1.75);
      expect(infoMgr.weight).toBe(75);
      expect(infoMgr.biography).toBe('somebody must have lived some life');
    });

    it('must not accept negative or null numbers for age, size, weight', () => {
      expect(
        () =>
          new InfoManager({
            name: 'test 2',
            gender: 'female',
            alignment: 'LG',
            classes: [{ characterClass: Rogue, level: 1 }],
            race: Elf,
            age: 0,
          }),
      ).toThrow();

      expect(
        () =>
          new InfoManager({
            name: 'test 2',
            gender: 'female',
            alignment: 'LG',
            classes: [{ characterClass: Rogue, level: 1 }],
            race: Elf,
            size: -1,
          }),
      ).toThrow();

      expect(
        () =>
          new InfoManager({
            name: 'test 2',
            gender: 'female',
            alignment: 'LG',
            classes: [{ characterClass: Rogue, level: 1 }],
            race: Elf,
            weight: -2,
          }),
      ).toThrow();
    });

    it("must not accept negative numbers for 'experience points'", () => {
      expect(
        () =>
          new InfoManager({
            name: 'test 2',
            gender: 'female',
            alignment: 'LG',
            classes: [{ characterClass: Rogue, level: 1 }],
            race: Elf,
            'experiences points': -3,
          }),
      ).toThrow();
    });
  });

  describe('InfoManager must provide the InfoAttributes interface', () => {
    const infoMgr = new InfoManager({
      name: 'test 2',
      gender: 'female',
      alignment: 'LG',
      classes: [{ characterClass: Rogue, level: 1 }],
      race: Elf,
      'experiences points': 113,
      age: 17,
      biography: 'somebody must have lived some life',
      size: 1.75,
      weight: 75,
    });

    it('must provide getters with the appropriate value for each member', () => {
      expect(infoMgr.name).toBe('test 2');
      expect(infoMgr.gender).toBe('female');
      expect(infoMgr.alignment).toBe('LG');
      expect(infoMgr.classes).toEqual([{ characterClass: Rogue, level: 1 }]);
      expect(infoMgr.race).toBe(Elf);

      expect(infoMgr['experiences points']).toBe(113);
      expect(infoMgr.size).toBe(1.75);
      expect(infoMgr.weight).toBe(75);
      expect(infoMgr.biography).toBe('somebody must have lived some life');
    });

    it("must provide a setter for 'experience points'", () => {
      infoMgr['experiences points'] = 220;
      expect(infoMgr['experiences points']).toBe(220);
    });

    it("'experience points' setter must not accept negative values", () => {
      expect(() => {
        infoMgr['experiences points'] = -1;
      }).toThrow();
    });
  });

  describe('InfoManager must provide a levelUp function that matches the following constraints', () => {
    const infoMgr = new InfoManager({
      name: 'test 2',
      gender: 'female',
      alignment: 'LG',
      classes: [{ characterClass: Rogue, level: 1 }],
      race: Elf,
      'experiences points': 113,
      age: 17,
      biography: 'somebody must have lived some life',
      size: 1.75,
      weight: 75,
    });

    it('must increment the level within the given value if any or 1', () => {
      infoMgr.levelUp(Rogue);
      expect(
        infoMgr.classes.find((current) =>
          Object.is(current.characterClass, Rogue),
        )?.level,
      ).toBe(2);

      infoMgr.levelUp(Rogue, 2);
      expect(
        infoMgr.classes.find((current) =>
          Object.is(current.characterClass, Rogue),
        )?.level,
      ).toBe(4);
    });

    it('must throw an error if the level value is negative or 0', () => {
      expect(() => {
        infoMgr.levelUp(Rogue, 0);
      }).toThrow();

      expect(() => {
        infoMgr.levelUp(Rogue, -1);
      }).toThrow();
    });

    it('must throw an error if the character is not of the given class', () => {
      expect(() => {
        infoMgr.levelUp(Barbarian);
      }).toThrow();
    });
  });
});
