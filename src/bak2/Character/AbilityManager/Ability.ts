import { IAbilityTransformer } from './interfaces';

export default class Ability {
  private mValue: number = 1;

  private mTransformers: Set<IAbilityTransformer>;

  constructor(value: number = 1) {
    this.value = value;
    this.mTransformers = new Set<IAbilityTransformer>();
  }

  get value(): number {
    let value = this.mValue;
    this.mTransformers.forEach((mod: IAbilityTransformer) => {
      if (mod.getValue) {
        value = mod.getValue(value);
      }

      return value;
    });

    return value;
  }

  set value(value) {
    this.mValue = Math.max(1, Math.min(30, value));
  }

  get modifier(): number {
    let value = Ability.getModifierValue(this.value);
    this.mTransformers.forEach((mod: IAbilityTransformer) => {
      if (mod.getModifier) {
        value = mod.getModifier(value);
      }

      return value;
    });

    return value;
  }

  get transformers(): IAbilityTransformer[] {
    return [...this.mTransformers];
  }

  addTransformer(transformer: IAbilityTransformer) {
    this.mTransformers.add(transformer);
  }

  removeTransformer(transformer: IAbilityTransformer) {
    this.mTransformers.delete(transformer);
  }

  static getModifierValue(ability: number): number {
    return Math.floor((ability - 10) / 2);
  }
}
