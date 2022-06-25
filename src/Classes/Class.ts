import { MiddleWare } from '@benjamin_fdw/core';
import { Dice } from '@benjamin_fdw/dice';
import { BuilderMiddleWare } from '../Builder';
import { CharacterOptions, IBaseCharacter } from '../Character';
import { IClass, ClassOptions } from './interfaces';

export default class Class implements IClass {
  public readonly name: string;

  public readonly 'hit dice': Dice;

  public readonly feats: any[];

  private _levelUp: MiddleWare<IBaseCharacter>;

  constructor(options: ClassOptions) {
    this.name = options.name;
    this['hit dice'] =
      options['hit dice'] instanceof Dice
        ? options['hit dice']
        : new Dice(options['hit dice']);
    this.feats = options.feats;
    this._levelUp = options.levelUp;
    this._levelUp.priority = 1;
  }

  get build(): BuilderMiddleWare {
    const mw = (options: Partial<CharacterOptions>) => {
      const result = options;

      result.classes = result.classes
        ? [...result.classes, { characterClass: this, level: 1 }]
        : [{ characterClass: this, level: 1 }];
      result['hit dice'] = this['hit dice'];

      result.features = options.features
        ? new Map<string, any>([
            ...options.features,
            ...this.feats.map((value): [string, string] => [value, value]),
          ])
        : new Map<string, any>(this.feats.map((value) => [value, value]));

      return result;
    };

    return mw;
  }

  get levelUp(): MiddleWare<IBaseCharacter> {
    return this._levelUp;
  }
}
