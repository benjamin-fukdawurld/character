import { MiddleWare } from '@benjamin_fdw/core';
import { Dice } from '@benjamin_fdw/dice';

import { BuilderMiddleWare } from '../Builder';
import { IBaseCharacter } from '../Character';

export interface IClass {
  readonly name: string;
  readonly 'hit dice': Dice;
  readonly feats: any[];

  readonly build: BuilderMiddleWare;
  readonly levelUp: MiddleWare<IBaseCharacter>;
}

export interface ClassOptions {
  name: string;
  'hit dice': string | Dice;

  levelUp: MiddleWare<IBaseCharacter>;
  feats: any[];
}
