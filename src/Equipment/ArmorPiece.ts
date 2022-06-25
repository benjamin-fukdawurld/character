import { MiddleWare } from '@benjamin_fdw/core';
import { ArmorPieceOptions } from './interfaces';
import Item from '../common/Item';

export default abstract class ArmorPiece<Env = any> extends Item {
  public readonly 'armor class bonus': number;

  public constructor(options: ArmorPieceOptions) {
    super(options);
    this['armor class bonus'] = options['armor class bonus'];
  }

  public abstract get middleware(): MiddleWare<number, Env>;
}
