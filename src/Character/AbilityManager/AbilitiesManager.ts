import { getAssociatedAbilityName } from './utils';
import { ISavingThrowTransformer, ISkillTransformer, AbilityNames, SkillNames } from './interfaces';
import Ability from './Ability';

export default class AbilitiesManager {
  public initiative: number;

  public passivePerception: number;

  private mAbilities: Map<AbilityNames, Ability>;

  private mSavingThrowTransformers: Map<AbilityNames, ISavingThrowTransformer[]>;

  private mSkillTransformers: Map<SkillNames, ISkillTransformer[]>;

  constructor(options: {
    abilities: Map<AbilityNames, Ability>;
    savingThrowTransformers: Map<AbilityNames, ISavingThrowTransformer[]>;
    skillTransformers: Map<SkillNames, ISkillTransformer[]>;
    initiative?: number;
    passivePerception?: number;
  }) {
    this.initiative = options.initiative ?? 0;
    this.passivePerception = options.passivePerception ?? 0;
    this.mAbilities = options.abilities;
    this.mSavingThrowTransformers = options.savingThrowTransformers;
    this.mSkillTransformers = options.skillTransformers;
  }

  get abilities() {
    return this.mAbilities;
  }

  getAbility(name: AbilityNames): Ability {
    return this.mAbilities.get(name)!;
  }

  getSavingThrowBonus(name: AbilityNames): number {
    return (
      this.mSavingThrowTransformers
        .get(name)
        ?.reduce<number>(
          (currentBonus: number, transformer: ISavingThrowTransformer) =>
            transformer.getBonus(currentBonus),
          this.getAbility(name).modifier,
        ) ?? 0
    );
  }

  getSkills(name: SkillNames): number {
    return (
      this.mSkillTransformers
        .get(name)
        ?.reduce<number>(
          (currentBonus: number, transformer: ISkillTransformer) =>
            transformer.getBonus(currentBonus),
          this.getAbility(getAssociatedAbilityName(name)).modifier,
        ) ?? 0
    );
  }

  addSavingThrowTransformer(transformer: ISavingThrowTransformer) {
    if (!this.mSavingThrowTransformers.has(transformer.ability)) {
      this.mSavingThrowTransformers.set(transformer.ability, [transformer]);
      return;
    }

    const modArray = this.mSavingThrowTransformers.get(transformer.ability)!;
    modArray.push(transformer);
  }

  get savingThrowTransformers(): [AbilityNames, ISavingThrowTransformer[]][] {
    return [...this.mSavingThrowTransformers];
  }

  removeSavingThrowTransformer(transformer: ISavingThrowTransformer) {
    const modArray = this.mSavingThrowTransformers.get(transformer.ability)!;
    modArray?.filter((current: ISavingThrowTransformer) => !Object.is(current, transformer));
  }

  addSkillTransformer(transformer: ISkillTransformer) {
    if (!this.mSkillTransformers.has(transformer.skill)) {
      this.mSkillTransformers.set(transformer.skill, [transformer]);
      return;
    }

    const modArray = this.mSkillTransformers.get(transformer.skill)!;
    modArray.push(transformer);
  }

  removeSkillTransformer(transformer: ISkillTransformer) {
    const modArray = this.mSkillTransformers.get(transformer.skill)!;
    modArray?.filter((current: ISkillTransformer) => !Object.is(current, transformer));
  }

  get skillTransformers(): [SkillNames, ISkillTransformer[]][] {
    return [...this.mSkillTransformers];
  }
}
