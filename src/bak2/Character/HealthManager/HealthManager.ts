import { DiceSet } from '@benjamin_fdw/dice';
import { HealthTransformer } from './interfaces';

export default class HealthManager {
  private mMaxHitPoints: number;

  private mHitPoints: number;

  private mHitDice: DiceSet;

  private mTransformers: Set<HealthTransformer>;

  constructor(options: { maxHitPoints: number; hitPoints?: number; hitDice: DiceSet }) {
    this.mMaxHitPoints = options.maxHitPoints;
    this.mHitPoints = options.hitPoints ?? options.maxHitPoints;
    this.mHitDice = options.hitDice;
    this.mTransformers = new Set<HealthTransformer>();
  }

  get maxHitPoints(): number {
    let result = this.mMaxHitPoints;
    this.mTransformers.forEach((mod: HealthTransformer) => {
      result = mod?.maxHitPoints(result) ?? result;
    });

    return result;
  }

  get hitPoints(): number {
    let result = this.mHitPoints;
    this.mTransformers.forEach((mod: HealthTransformer) => {
      result = mod?.hitPoints(result) ?? result;
    });

    return result;
  }

  get hitDice(): DiceSet {
    let result = this.mHitDice;
    this.mTransformers.forEach((mod: HealthTransformer) => {
      result = mod?.hitDice(result) ?? result;
    });

    return result;
  }

  get transformers(): HealthTransformer[] {
    return [...this.mTransformers];
  }

  addTransformer(mod: HealthTransformer): void {
    this.mTransformers.add(mod);
    if (mod.duration) {
      setTimeout(() => {
        if (this.mTransformers.has(mod)) {
          return;
        }

        if (mod.tearDown) {
          mod.tearDown(this);
        }

        this.mTransformers.delete(mod);
      }, mod.duration);
    }
  }

  removeTransformer(mod: HealthTransformer): void {
    if (this.mTransformers.has(mod)) {
      return;
    }

    if (mod.tearDown) {
      mod.tearDown(this);
    }

    this.mTransformers.delete(mod);
  }
}
