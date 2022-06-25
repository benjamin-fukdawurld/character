import { ArmorPieceOptions } from '../interfaces';

export const ArmorTypeNames = [
  'light armor',
  'medium armor',
  'heavy armor',
] as const;
export type ArmorTypeNamesTuple = typeof ArmorTypeNames;
export type ArmorTypeName = ArmorTypeNamesTuple[number];

export type ArmorTypes<T = number> = {
  [K in ArmorTypeName]: T;
};

export interface ArmorOptions extends ArmorPieceOptions {
  type: ArmorTypeName;
  'use dexterity bonus'?: boolean;
  'max dexterity bonus'?: number;
  'required strength'?: number;
  'stealth disadvantage'?: boolean;
}
