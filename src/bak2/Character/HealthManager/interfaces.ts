import { DiceSet } from '@benjamin_fdw/dice';

export interface IHealthManager {
  readonly maxHitPoints: number;

  readonly hitPoints: number;

  readonly hitDice: DiceSet;

  readonly transformers: HealthTransformer[];

  addTransformer(mod: HealthTransformer): void;

  removeTransformer(mod: HealthTransformer): void;
}

export interface HealthTransformer {
  duration?: number;

  setUp?: (mgr: IHealthManager) => void;
  tearDown?: (mgr: IHealthManager) => void;

  maxHitPoints: (hp: number) => number;

  hitPoints: (hp: number) => number;

  hitDice: (dices: DiceSet) => DiceSet;
}
