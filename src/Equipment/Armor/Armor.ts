import { MiddleWare } from '@benjamin_fdw/core';
import ArmorPiece from '../ArmorPiece';
import { ArmorTypeName, ArmorOptions } from './interfaces';

export default class Armor<Env = any> extends ArmorPiece<Env> {
  public readonly type: ArmorTypeName;

  public readonly 'armor class bonus': number;

  public readonly 'use dexterity bonus': boolean;

  public readonly 'max dexterity bonus': number | undefined;

  public readonly 'required strength': number | undefined;

  public readonly 'stealth disadvantage': boolean;

  private _armorClassMiddleWare: MiddleWare<number, Env>;

  public constructor(options: ArmorOptions) {
    super(options);
    this.type = options.type;
    this['use dexterity bonus'] = options['use dexterity bonus'] ?? false;
    this['max dexterity bonus'] = options['max dexterity bonus'];
    this['required strength'] = options['required strength'];
    this['stealth disadvantage'] = options['stealth disadvantage'] ?? false;

    this._armorClassMiddleWare = this.generateMiddleWare();
    this._armorClassMiddleWare.priority = 1;

    if (this['max dexterity bonus'] && this['max dexterity bonus'] < 0) {
      throw new Error(
        `'max dexterity bonus' cannot be a negative value (received: ${this['max dexterity bonus']})`,
      );
    }

    if (this['required strength'] && this['required strength'] < 0) {
      throw new Error(
        `'required strength' cannot be a negative value (received: ${this['required strength']})`,
      );
    }
  }

  public get middleware(): MiddleWare<number, Env> {
    return this._armorClassMiddleWare;
  }

  private generateMiddleWare(): MiddleWare<number, Env> {
    if (!this['use dexterity bonus']) {
      return (value: number) => 10 + this['armor class bonus'];
    }

    if (!this['max dexterity bonus']) {
      return (value: number) => value + this['armor class bonus'];
    }

    return (value: number) =>
      Math.min(value, 10 + this['max dexterity bonus']!) +
      this['armor class bonus'];
  }
}
