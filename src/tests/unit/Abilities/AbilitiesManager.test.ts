import { describe, it, expect } from '@jest/globals';
import AbilitiesManager from '../../../Abilities/AbilitiesManager';
import {
  AbilityName,
  AbilityNames,
  Abilities,
} from '../../../Abilities/interfaces';

describe('An AbilitiesManager should manage the abilities of character', () => {
  const manager = new AbilitiesManager({
    strength: 1,
    dexterity: 2,
    constitution: 3,
    wisdom: 4,
    intelligence: 5,
    charisma: 6,
  });

  it('should return an Ability for each AbilityName with the expected value', () => {
    expect(manager.strength.value).toBe(1);
    expect(manager.getAbility('strength').value).toBe(1);
    expect(manager.dexterity.value).toBe(2);
    expect(manager.getAbility('dexterity').value).toBe(2);
    expect(manager.constitution.value).toBe(3);
    expect(manager.getAbility('constitution').value).toBe(3);
    expect(manager.wisdom.value).toBe(4);
    expect(manager.getAbility('wisdom').value).toBe(4);
    expect(manager.intelligence.value).toBe(5);
    expect(manager.getAbility('intelligence').value).toBe(5);
    expect(manager.charisma.value).toBe(6);
    expect(manager.getAbility('charisma').value).toBe(6);
  });

  it('should be serializable as JSON', () => {
    const json = JSON.parse(manager.toJSON());
    AbilityNames.forEach((name: AbilityName) => {
      expect(json[name]).toBe(manager[name].value);
    });
  });

  it('should be unserializable from JSON', () => {
    const mgr = AbilitiesManager.fromJSON(manager.toJSON());
    AbilityNames.forEach((name: AbilityName) => {
      expect(mgr[name].rawValue).toBe(manager[name].rawValue);
    });
  });

  it('should manage remaining ability points', () => {
    const mgr = new AbilitiesManager({
      strength: 1,
      dexterity: 2,
      constitution: 3,
      wisdom: 4,
      intelligence: 5,
      charisma: 6,
    });
    expect(mgr['remaining points']).toBe(0);

    mgr['remaining points'] = 4;
    expect(mgr['remaining points']).toBe(4);

    expect(() => {
      mgr['remaining points'] = -1;
    }).toThrow();
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

    const abilities = new AbilitiesManager(abilitiesData);

    AbilityNames.forEach((name: AbilityName) => {
      expect(abilities.getAbility(name).value).toBe(abilitiesData[name]);
    });
  });
});
