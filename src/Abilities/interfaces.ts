export const AbilityNames = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const;

export type AbilityNamesTuple = typeof AbilityNames;
export type AbilityName = AbilityNamesTuple[number];

export const AbilityModifierNames = [
  'strength modifier',
  'dexterity modifier',
  'constitution modifier',
  'intelligence modifier',
  'wisdom modifier',
  'charisma modifier',
] as const;

export type AbilityModifierNamesTuple = typeof AbilityModifierNames;
export type AbilityModifierName = AbilityModifierNamesTuple[number];

export const SkillNames = [
  'acrobatics',
  'animal handling',
  'arcana',
  'athletics',
  'deception',
  'history',
  'insight',
  'intimidation',
  'investigation',
  'medicine',
  'nature',
  'perception',
  'performance',
  'persuasion',
  'religion',
  'sleight of hand',
  'stealth',
  'survival',
] as const;
export type SkillNamesTuple = typeof SkillNames;
export type SkillName = SkillNamesTuple[number];

export const StatNames = ['initiative', 'armor class'] as const;
export type StatNamesTuple = typeof StatNames;
export type StatName = StatNamesTuple[number];

export type Abilities<T = number> = {
  [K in AbilityName]: T;
};

export type AbilityModifiers<T = number> = {
  [K in AbilityModifierName]: T;
};

export type Skills<T = number> = {
  [K in SkillName]: T;
};

export type Stats<T = number> = {
  [K in StatName]: T;
};

export type AbilitiesInitializer = (ability: AbilityName) => number;

export type SkillsInitializer = (ability: SkillName) => number;

export type StatInitializer = (ability: StatName) => number;

export type AbilitiesManagerOptions = Partial<Abilities<number>> & {
  remainingPoints?: number;
};
