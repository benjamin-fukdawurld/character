export type AbilityNames =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';

export type SkillNames =
  | 'acrobatics'
  | 'animal handling'
  | 'arcana'
  | 'athletics'
  | 'deception'
  | 'history'
  | 'insight'
  | 'intimidation'
  | 'investigation'
  | 'medicine'
  | 'nature'
  | 'perception'
  | 'performance'
  | 'persuasion'
  | 'religion'
  | 'sleight of hand'
  | 'stealth'
  | 'survival';

export interface IAbilityTransformer {
  getValue?: (abilityValue: number) => number;
  getModifier?: (modifierValue: number) => number;
}

export interface ISavingThrowTransformer {
  ability: AbilityNames;

  getBonus: (modifier: number) => number;
}

export interface ISkillTransformer {
  skill: SkillNames;

  getBonus: (skillBonus: number) => number;
}

export interface AbilityConstraint {
  min?: number;
  max?: number;
  (value: number): boolean;
}
