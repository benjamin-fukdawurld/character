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

export const StatNames = [
  'initiative',
  'passive perception',
  'speed',
  'dark vision',
] as const;
export type StatNamesTuple = typeof StatNames;
export type StatName = StatNamesTuple[number];

export type Abilities = {
  [K in AbilityName]: number;
};

export type Skills = {
  [K in SkillName]: number;
};

export type Stats = {
  [K in StatName]: number;
};

export type AbilitiesInitializer = (ability: AbilityName) => number;

export type SkillsInitializer = (ability: SkillName) => number;

export type StatInitializer = (ability: StatName) => number;

export type AbilitiesManagerOptions = {
  abilities?: Abilities | AbilitiesInitializer;
  remainingAbilityPoints?: number;
} & Partial<Stats>;
