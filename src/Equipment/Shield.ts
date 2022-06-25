import { MiddleWare } from '@benjamin_fdw/core';
import { ArmorPieceOptions } from './interfaces';
import ArmorPiece from './ArmorPiece';

export default class Shield<Env = any> extends ArmorPiece<Env> {
  private _armorClassMiddleWare: MiddleWare<number, Env>;

  constructor(options: ArmorPieceOptions) {
    super(options);
    this._armorClassMiddleWare = (value: number) =>
      value + this['armor class bonus'];
    this._armorClassMiddleWare.priority = 1;
  }

  get middleware(): MiddleWare<number, Env> {
    return this._armorClassMiddleWare;
  }
}
