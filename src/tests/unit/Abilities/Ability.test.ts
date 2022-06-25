import { describe, it, expect } from '@jest/globals';
import Ability from '../../../Abilities/Ability';
import {
  Abilities,
  AbilityName,
  AbilityNames,
} from '../../../Abilities/interfaces';
import { toAbilities } from '../../../Abilities/utils';

describe('An Ability contains one of the six main attributes of your character', () => {
  it('should not be greater than 0', () => {
    const ability = new Ability();
    expect(ability.value).toBeGreaterThan(0);

    expect(() => new Ability(-1)).toThrow();

    expect(() => {
      ability.rawValue = 0;
    }).toThrow();

    expect(() => {
      ability.rawValue = -1;
    }).toThrow();
  });

  it('should not be less than or equal to 30', () => {
    const ability = new Ability();
    expect(ability.value).toBeLessThanOrEqual(30);

    expect(() => new Ability(35)).toThrow();

    ability.rawValue = 30;
    expect(ability.value).toBeLessThanOrEqual(30);

    expect(() => {
      ability.rawValue = 35;
    }).toThrow();
  });

  it('should take any value in range [1, 30]', () => {
    const ability = new Ability();
    for (let i = 1; i <= 30; ++i) {
      expect(new Ability(i).value).toBe(i);
      ability.rawValue = i;
      expect(ability.value).toBe(i);
    }
  });

  it('should provide the modifier value of the ability as modifier = floor((value - 10)/2)', () => {
    const ability = new Ability();
    let modifier = 0;
    for (let i = 1; i <= 30; ++i) {
      ability.rawValue = i;
      modifier = Math.floor((i - 10) / 2);
      expect(ability.modifier).toBe(modifier);
      expect(Ability.getModifierValue(i)).toBe(modifier);
    }
  });
});

describe('toAbilities creates an Abilities from an abilitiesInitializer function', () => {
  it('should create an Abilities with each value matching the abilitiesInitializer returned value', () => {
    const abilitiesData: Abilities = {
      strength: 1,
      dexterity: 2,
      constitution: 3,
      wisdom: 4,
      intelligence: 5,
      charisma: 6,
    };

    const abilities = toAbilities((name: AbilityName) => abilitiesData[name]);

    AbilityNames.forEach((name: AbilityName) => {
      expect(abilities[name]).toBe(abilitiesData[name]);
    });
  });
});
