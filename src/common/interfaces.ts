export interface Range<T = number> {
  min: T;
  max: T;
}

export const SizeCategoryNames = ['xs', 's', 'm', 'l', 'xl'] as const;
export type SizeCategoryNamesTuple = typeof SizeCategoryNames;
export type SizeCategoryName = SizeCategoryNamesTuple[number];
export type SizeCategories<T> = {
  [K in SizeCategoryName]: T;
};

export const CharacterHeightRanges: SizeCategories<Range> = {
  xs: { min: 0, max: 60 },
  s: { min: 60, max: 120 },
  m: { min: 120, max: 240 },
  l: { min: 240, max: 480 },
  xl: { min: 480, max: Number.MAX_VALUE },
} as const;

export const CoinNames = [
  'copper coins',
  'silver coins',
  'electrum coins',
  'gold coins',
  'platinum coins',
] as const;

export type CoinNamesTuple = typeof CoinNames;
export type CoinName = CoinNamesTuple[number];
export type Coins = {
  [K in CoinName]: number;
};

export const DamageTypeNames = ['bludgeoning', 'piercing', 'slashing'] as const;
export type DamageTypeNamesTuple = typeof DamageTypeNames;
export type DamageTypeName = DamageTypeNamesTuple[number];

export type Damages<T = number> = {
  [K in DamageTypeName]: T;
};

export interface ItemOptions {
  name: string;
  weight: number;
  cost: Partial<Coins>;
  feats: any[];
}
