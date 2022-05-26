import { Dice } from '@benjamin_fdw/dice';

import {
  HealthAttributeName,
  HealthAttributeNames,
  HealthManagerOptions,
} from './interfaces';

export default class HealthManager {
  private _hitPointsMax: number;

  private _currentHitPoints: number;

  private _temporaryHitPoints: number;

  private _hitDice: Dice;

  private _totalHitDice: number;

  private _deathSaves: boolean[];

  public constructor(options: HealthManagerOptions) {
    this._hitDice =
      typeof options['hit dice'] === 'string'
        ? new Dice(options['hit dice'])
        : options['hit dice'];
    this._hitPointsMax =
      options['hit point max'] ??
      this._hitDice.max + (options['constitution bonus'] ?? 0);

    this._currentHitPoints =
      options['current hit points'] ?? this._hitPointsMax;
    this._temporaryHitPoints = options['temporary hit points'] ?? 0;
    this._totalHitDice = options['total hit dice'] ?? 1;
    this._deathSaves = [];
  }

  public toJSON(): string {
    return JSON.stringify(
      Object.fromEntries(
        HealthAttributeNames.map((attribute: HealthAttributeName) => [
          attribute,
          attribute === 'hit dice'
            ? this[attribute].toString()
            : this[attribute],
        ]),
      ),
    );
  }

  public get 'hit point max'(): number {
    return this._hitPointsMax;
  }

  public set 'hit point max'(value: number) {
    if (value < 1) {
      throw new Error(
        `'hit point max' cannot be less than 1 (received: ${value})`,
      );
    }

    this._hitPointsMax = value;
    this._currentHitPoints = Math.min(this._currentHitPoints, value);
  }

  public get 'current hit points'(): number {
    return this._currentHitPoints;
  }

  public set 'current hit points'(value: number) {
    this._currentHitPoints = value;
  }

  public get 'temporary hit points'(): number {
    return this._temporaryHitPoints;
  }

  public set 'temporary hit points'(value: number) {
    this._temporaryHitPoints = value;
  }

  public get 'hit dice'(): Dice {
    return this._hitDice;
  }

  public get 'total hit dice'(): number {
    return this._totalHitDice;
  }

  public set 'total hit dice'(value: number) {
    this._totalHitDice = value;
  }

  public get 'death saves'(): boolean[] {
    return this._deathSaves;
  }

  public addDeathSave(value: boolean) {
    this._deathSaves.push(value);
  }
}
