import { describe, it, expect } from '@jest/globals';

import {
  SkillNames,
  SkillName,
  AbilityNames,
  AbilityName,
  Abilities,
} from './interfaces';

import {
  getAssociatedAbilityName,
  isAbilityName,
  isSkillName,
  isAbilities,
} from './utils';

describe('associated ability names', () => {
  it('should return an ability for each skill', () => {
    (SkillNames as readonly SkillName[]).forEach((skill: SkillName) => {
      expect(getAssociatedAbilityName(skill)).toBeTruthy();
    });
  });

  it('should throw if the skill has no associated ability', () => {
    expect(() =>
      getAssociatedAbilityName('not a skill' as any as SkillName),
    ).toThrow();
  });

  it('should return the appropriate ability for each skill', () => {
    const reverseMap = new Map<AbilityName, SkillName[]>([
      ['strength', ['athletics']],
      ['dexterity', ['acrobatics', 'sleight of hand', 'stealth']],
      [
        'intelligence',
        ['arcana', 'history', 'investigation', 'nature', 'religion'],
      ],
      [
        'wisdom',
        ['animal handling', 'insight', 'medicine', 'perception', 'survival'],
      ],
      ['charisma', ['deception', 'intimidation', 'performance', 'persuasion']],
      ['constitution', []],
    ]);

    (SkillNames as readonly SkillName[]).forEach((skill: SkillName) => {
      expect(
        reverseMap.get(getAssociatedAbilityName(skill))!.includes(skill),
      ).toBe(true);
    });
  });
});

describe('string union type check functions', () => {
  it('should check whether a value is an AbilityName with isAbilityName', () => {
    (AbilityNames as readonly AbilityName[]).forEach((ability: AbilityName) => {
      expect(isAbilityName(ability)).toBe(true);
    });

    expect(isAbilityName({})).toBe(false);
    expect(isAbilityName('any string')).toBe(false);
  });

  it('should check whether a value is a SkillName with isSkillName', () => {
    (SkillNames as readonly SkillName[]).forEach((skill: SkillName) => {
      expect(isSkillName(skill)).toBe(true);
    });

    expect(isSkillName({})).toBe(false);
    expect(isSkillName('any string')).toBe(false);
  });

  it('should check whether a value is an Abilities with isAbilities', () => {
    const abilities: Abilities = {
      strength: 1,
      dexterity: 1,
      constitution: 1,
      intelligence: 1,
      wisdom: 1,
      charisma: 1,
    };

    const partialAbilities: Partial<Abilities> = {
      strength: 1,
      dexterity: 1,
      wisdom: 1,
      charisma: 1,
    };

    expect(isAbilities(abilities)).toBe(true);
    expect(isSkillName(partialAbilities)).toBe(false);
    expect(isSkillName({})).toBe(false);
    expect(isSkillName('any string')).toBe(false);
  });
});
