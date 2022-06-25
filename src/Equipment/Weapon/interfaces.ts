import { Dice } from '@benjamin_fdw/dice';

import { ItemOptions, Damages } from '../../common/interfaces';

export const WeaponTypeNames = ['melee weapon', 'ranged weapon'] as const;
export type WeaponTypeNamesTuple = typeof WeaponTypeNames;
export type WeaponTypeName = WeaponTypeNamesTuple[number];

export const WeaponCategoryNames = ['simple weapon', 'martial weapon'] as const;
export type WeaponCategoryNamesTuple = typeof WeaponCategoryNames;
export type WeaponCategoryName = WeaponCategoryNamesTuple[number];

export const WeaponWeightCategoryNames = ['light', 'regular', 'heavy'] as const;
export type WeaponWeightCategoryNamesTuple = typeof WeaponWeightCategoryNames;
export type WeaponWeightCategoryName = WeaponWeightCategoryNamesTuple[number];

export const WeaponGripNames = [
  'single handed',
  'two handed',
  'versatile',
] as const;
export type WeaponGripNamesTuple = typeof WeaponGripNames;
export type WeaponGripName = WeaponGripNamesTuple[number];
export type WeaponGrips<T = any> = {
  'single handed': T;
  'two handed': T;
};

export type WeaponGripDamages<T = Dice | string | number> = Partial<Damages<T>>;
export type WeaponDamages<T = Dice | string | number> = Partial<{
  [K in WeaponGripName]: WeaponGripDamages<T>;
}>;

export interface WeaponRange {
  min: number;
  max: number;
}

export interface WeaponOptions extends ItemOptions {
  type: WeaponTypeName;
  category: WeaponCategoryName;
  'weight category'?: WeaponWeightCategoryName;
  'grip style'?: WeaponGripName;
  throwable?: boolean;
  ammunition?: boolean;
  range?: WeaponRange;
  damages: WeaponDamages<Dice | string | number>;
}
