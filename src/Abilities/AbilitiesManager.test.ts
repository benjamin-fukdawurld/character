import { describe, it, expect } from '@jest/globals';
import AbilitiesManager from './AbilitiesManager';
import {
  AbilityName,
  StatName,
  AbilityNames,
  SkillNames,
  StatNames,
  AbilitiesManagerOptions,
  Abilities,
} from './interfaces';
import { getAssociatedAbilityName } from './utils';

describe('An AbilitiesManager should manage the abilities of character', () => {
  const manager = new AbilitiesManager({
    abilities: {
      strength: 1,
      dexterity: 2,
      constitution: 3,
      wisdom: 4,
      intelligence: 5,
      charisma: 6,
    },
    initiative: 7,
    'dark vision': 8,
    'passive perception': 9,
    remainingAbilityPoints: 10,
    speed: 11,
  });

  it('should return an Ability for each AbilityName with the expected value', () => {
    expect(manager.strength.value).toBe(1);
    expect(manager['strength'].value).toBe(1);
    expect(manager.getAbility('strength').value).toBe(1);
    expect(manager.dexterity.value).toBe(2);
    expect(manager['dexterity'].value).toBe(2);
    expect(manager.getAbility('dexterity').value).toBe(2);
    expect(manager.constitution.value).toBe(3);
    expect(manager['constitution'].value).toBe(3);
    expect(manager.getAbility('constitution').value).toBe(3);
    expect(manager.wisdom.value).toBe(4);
    expect(manager['wisdom'].value).toBe(4);
    expect(manager.getAbility('wisdom').value).toBe(4);
    expect(manager.intelligence.value).toBe(5);
    expect(manager['intelligence'].value).toBe(5);
    expect(manager.getAbility('intelligence').value).toBe(5);
    expect(manager.charisma.value).toBe(6);
    expect(manager['charisma'].value).toBe(6);
    expect(manager.getAbility('charisma').value).toBe(6);
  });

  it('should return the expected value for each StatName', () => {
    expect(manager.initiative).toBe(7);
    expect(manager['dark vision']).toBe(8);
    expect(manager['passive perception']).toBe(9);
    expect(manager.speed).toBe(11);
  });

  it('should allow editing each StatName', () => {
    const mgr = AbilitiesManager.fromJSON(manager.toJSON());
    mgr.initiative = 1;
    expect(mgr.initiative).toBe(1);

    mgr['dark vision'] = 2;
    expect(mgr['dark vision']).toBe(2);

    mgr['passive perception'] = 3;
    expect(mgr['passive perception']).toBe(3);

    mgr.speed = 5;
    expect(mgr.speed).toBe(5);
  });

  it('should return the modifier value of the associated Ability for each SkillName', () => {
    SkillNames.forEach((skill) => {
      const ability = getAssociatedAbilityName(skill);
      expect(manager.getSkillValue(skill)).toBe(manager[ability].modifier);
    });
  });

  it('should return the expected value for the armor class', () => {
    expect(manager['armor class']).toEqual(10 + manager.dexterity.modifier);
  });

  it('should be serializable as JSON', () => {
    const json = JSON.parse(manager.toJSON());
    AbilityNames.forEach((name: AbilityName) => {
      expect(json?.abilities[name]).toBe(manager[name].value);
    });
    StatNames.forEach((name: StatName) => {
      expect(json[name]).toBe(manager[name]);
    });
  });

  it('should be unserializable from JSON', () => {
    const mgr = AbilitiesManager.fromJSON(manager.toJSON());
    AbilityNames.forEach((name: AbilityName) => {
      expect(mgr[name].value).toBe(manager[name].value);
    });
    StatNames.forEach((name: StatName) => {
      expect(mgr[name]).toBe(manager[name]);
    });
  });

  it('should manage remaining ability points', () => {
    const mgr = new AbilitiesManager();
    expect(mgr.remainingAbilityPoints).toBe(0);

    mgr.remainingAbilityPoints = 4;
    expect(mgr.remainingAbilityPoints).toBe(4);

    expect(() => {
      mgr.remainingAbilityPoints = -1;
    }).toThrow();
  });

  it('should give access to its ability map', () => {
    const map = manager.abilities;

    AbilityNames.forEach((ability: AbilityName) => {
      expect(manager[ability]).toBe(map.get(ability)!);
    });
  });
});

describe('AbilitiesManager.rollAbilityPoints roll a D&D 5 standard ability point dice roll', () => {
  it('should always return a number in range [18, 108]', () => {
    [...Array(100)].forEach(() => {
      const points = AbilitiesManager.rollAbilityPoints();
      expect(points).toBeGreaterThanOrEqual(18);
      expect(points).toBeLessThanOrEqual(108);
    });
  });
});

describe('AbilitiesManager creates an ability map given the input data', () => {
  it('should create an ability map with each ability equals to 1 if no args is provided', () => {
    const abilities = new AbilitiesManager();
    AbilityNames.forEach((name: AbilityName) => {
      expect(abilities.getAbility(name).value).toBe(1);
    });
  });

  it('should create an ability map with each ability equals to the ones in the given Abilities', () => {
    const abilitiesData: Abilities = {
      strength: 1,
      dexterity: 2,
      constitution: 3,
      wisdom: 4,
      intelligence: 5,
      charisma: 6,
    };

    const abilities = new AbilitiesManager({
      abilities: abilitiesData,
    });

    AbilityNames.forEach((name: AbilityName) => {
      expect(abilities.getAbility(name).value).toBe(abilitiesData[name]);
    });
  });

  it('should create an ability map from an abilitiesInitializer', () => {
    const abilitiesData: Abilities = {
      strength: 1,
      dexterity: 2,
      constitution: 3,
      wisdom: 4,
      intelligence: 5,
      charisma: 6,
    };

    const abilities = new AbilitiesManager({
      abilities: (name: AbilityName) => abilitiesData[name],
    });
    AbilityNames.forEach((name: AbilityName) => {
      expect(abilities.getAbility(name).value).toBe(abilitiesData[name]);
    });
  });
});
