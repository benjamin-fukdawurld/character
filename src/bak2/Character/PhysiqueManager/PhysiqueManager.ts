import { IPhysiqueTransformer } from './interfaces';

export default class PhysiqueManager {
  private mArmorClass: number;

  private mInitiative: number;

  private mSpeed: number;

  private mProficiencyBonus: number;

  private mTransformers: Set<IPhysiqueTransformer>;

  constructor(options: {
    armorClass: number;
    initiative: number;
    speed: number;
    proficiencyBonus: number;
    transformers: Set<IPhysiqueTransformer>;
  }) {
    this.mArmorClass = options.armorClass;
    this.mInitiative = options.initiative;
    this.mSpeed = options.speed;
    this.mProficiencyBonus = options.proficiencyBonus;
    this.mTransformers = options.transformers;
  }

  get armorClass() {
    let value = this.mArmorClass;
    this.mTransformers.forEach((transformer) => {
      if (transformer.getArmorClass) {
        value = transformer.getArmorClass(value);
      }

      return value;
    });

    return value;
  }

  get initiative() {
    let value = this.mInitiative;
    this.mTransformers.forEach((transformer) => {
      if (transformer.getInitiative) {
        value = transformer.getInitiative(value);
      }

      return value;
    });

    return value;
  }

  get speed() {
    let value = this.mSpeed;
    this.mTransformers.forEach((transformer) => {
      if (transformer.getSpeed) {
        value = transformer.getSpeed(value);
      }

      return value;
    });

    return value;
  }

  get proficiencyBonus() {
    let value = this.mProficiencyBonus;
    this.mTransformers.forEach((transformer) => {
      if (transformer.getProficiencyBonus) {
        value = transformer.getProficiencyBonus(value);
      }

      return value;
    });

    return value;
  }

  get transformers() {
    return [...this.mTransformers];
  }

  addTransformer(transformer: IPhysiqueTransformer) {
    this.mTransformers.add(transformer);
  }

  removeTransformer(transformer: IPhysiqueTransformer) {
    this.mTransformers.delete(transformer);
  }
}
