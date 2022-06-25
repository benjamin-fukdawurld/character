import { Dice } from '@benjamin_fdw/dice';
import Attribute from '../common/Attribute';

import {
  HealthAttributeName,
  HealthAttributeNames,
  HealthManagerOptions,
} from './interfaces';

export default class HealthManager<Env = any> {
  private _hitPointsMax: number;

  private _currentHitPoints: Attribute<number, Env>;

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

    this._currentHitPoints = new Attribute<number, Env>(
      options['current hit points'] ?? this._hitPointsMax,
    );
    this._temporaryHitPoints = options['temporary hit points'] ?? 0;
    this._totalHitDice = options['total hit dice'] ?? 1;
    this._deathSaves = [];

    this._currentHitPoints.pipeline.use(
      (value: number) => value + this._temporaryHitPoints,
    );
  }

  public toJSON(): string {
    return JSON.stringify(
      Object.fromEntries(
        HealthAttributeNames.map((attribute: HealthAttributeName) => {
          const value = this[attribute];
          let result: string | number | undefined;
          switch (attribute) {
            case 'hit dice':
              result = value.toString();
              break;

            case 'current hit points':
              result = (value as Attribute<number, Env>).rawValue;
              break;

            default:
              result = value as number;
              break;
          }

          return [attribute, result];
        }),
      ),
    );
  }

  public static fromJSON(json: string): HealthManager {
    return new HealthManager(JSON.parse(json));
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
    this._currentHitPoints.rawValue = Math.min(
      this._currentHitPoints.rawValue,
      value,
    );
  }

  public get 'current hit points'(): Attribute<number, Env> {
    return this._currentHitPoints;
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

  public clearDeathSaves(): void {
    this._deathSaves = [];
  }
}
