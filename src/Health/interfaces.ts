import { Dice } from '@benjamin_fdw/dice';

export const HealthAttributeNames = [
  'hit point max',
  'current hit points',
  'temporary hit points',
  'hit dice',
  'total hit dice',
  'death saves',
] as const;

export type HealthAttributeNamesTuple = typeof HealthAttributeNames;
export type HealthAttributeName = HealthAttributeNamesTuple[number];

export type HealthAttributes = {
  [K in HealthAttributeName]: number;
};

export interface HealthManagerOptions {
  'hit dice': string | Dice;
  'hit point max'?: number;
  'current hit points'?: number;
  'temporary hit points'?: number;
  'total hit dice'?: number;
  'constitution bonus'?: number;
}
