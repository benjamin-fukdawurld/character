import { Range, SizeCategoryName } from '../common/interfaces';
import { Abilities } from '../Abilities';
import { BuilderMiddleWare } from '../Builder';

export interface IRace {
  readonly name: string;
  readonly 'size label': SizeCategoryName;
  readonly 'size range': Range;
  readonly speed: number;
  readonly 'dark vision': number;
  readonly 'long rest duration': number;
  readonly languages: string[];
  readonly abilities: Abilities;
  readonly feats: any[];

  readonly build: BuilderMiddleWare;
}

export interface RaceOptions {
  name: string;
  'size label': SizeCategoryName;
  'size range'?: Range;
  speed?: number;
  'dark vision'?: number;
  'long rest duration'?: number;
  languages: string[];
  abilities: Abilities;
  feats: any[];
}
