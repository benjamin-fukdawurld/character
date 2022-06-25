import Race from '../Races/Race';
import Class from '../Classes/Class';

export const GenderNames = ['male', 'female', 'unknown'] as const;
export type GenderNamesTuple = typeof GenderNames;
export type GenderName = GenderNamesTuple[number];

export const AlignmentLaws = ['chaotic', 'neutral', 'lawful'];
export type AlignmentLawsTuple = typeof AlignmentLaws;
export type AlignmentLaw = AlignmentLawsTuple[number];

export const AlignmentMorals = ['evil', 'neutral', 'good'];
export type AlignmentMoralsTuple = typeof AlignmentMorals;
export type AlignmentMoral = AlignmentLawsTuple[number];

export const AlignmentShorts = [
  'CE',
  'CN',
  'CG',
  'NE',
  'N',
  'NG',
  'LE',
  'LN',
  'LG',
] as const;
export type AlignmentShortsTuple = typeof AlignmentShorts;
export type AlignmentShort = AlignmentLawsTuple[number];

export interface Alignment {
  law: AlignmentLaw;
  moral: AlignmentMoral;
}

export interface ClassInformation {
  characterClass: Class;
  level: number;
}

export const InfoAttributeNames = [
  'name',
  'age',
  'race',
  'gender',
  'classes',
  'experiences points',
  'alignment',
  'size',
  'weight',
  'biography',
] as const;
export type InfoAttributeNamesTuple = typeof InfoAttributeNames;
export type InfoAttributeName = InfoAttributeNamesTuple[number];
export type InfoAttributes = {
  name: string;
  age: number;
  gender: GenderName;
  alignment: AlignmentShort;
  race: Race;
  classes: ClassInformation[];
  'experiences points': number;
  size: number;
  weight: number;
  biography: string;
};

export interface InfoManagerOptions {
  name: string;
  age?: number;
  gender: GenderName;
  alignment: AlignmentShort;
  race: Race;
  classes: ClassInformation[];
  'experiences points'?: number;
  size?: number;
  weight?: number;
  biography?: string;
}
