import Attribute from '../common/Attribute';

export default class Ability<Env = any> extends Attribute<number, Env> {
  public static readonly MinValue: number = 1;

  public static readonly MaxValue: number = 30;

  public static ModifierProxy = <E = any>(attr: Attribute<number, E>) =>
    (attr as Ability).modifier;

  public constructor(value: number = 1) {
    if (value < 1 || value > 30) {
      throw new Error(
        `Cannot set ability value: out of range (expected value in range [${Ability.MinValue}, ${Ability.MaxValue}], received: ${value}`,
      );
    }
    super(value);
  }

  public get rawValue(): number {
    return super.rawValue;
  }

  public set rawValue(value: number) {
    if (value < Ability.MinValue || value > Ability.MaxValue) {
      throw new Error(
        `Cannot set ability value: out of range (expected value in range [${Ability.MinValue}, ${Ability.MaxValue}], received: ${value}`,
      );
    }
    super.rawValue = value;
  }

  public get modifier(): number {
    return Ability.getModifierValue(this.value);
  }

  public static getModifierValue(ability: number): number {
    return Math.floor((ability - 10) / 2);
  }
}
