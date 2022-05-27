import AbstractCharacterClass from './AbstractCharacterClass';
import { BuilderMiddleWare } from '../Builder';
import Character, { CharacterOptions } from '../Character';
import { MiddleWare } from '@benjamin_fdw/core';

export default class CharacterClass extends AbstractCharacterClass {
  private _builder: BuilderMiddleWare;

  private _levelUp: MiddleWare<Character>;

  constructor(builder: BuilderMiddleWare, levelUp: MiddleWare<Character>) {
    super();
    this._builder = builder;
    this._levelUp = levelUp;
  }

  public build(options: CharacterOptions): CharacterOptions {
    return this._builder(options);
  }

  public levelUp(character: Character) {
    return this._levelUp(character);
  }
}
