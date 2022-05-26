export default class Ability {
  public static readonly MinValue: number = 1;

  public static readonly MaxValue: number = 30;

  private _value: number = 1;

  public constructor(value: number = 1) {
    this.value = value;
  }

  public get value(): number {
    return this._value;
  }

  public set value(value) {
    this._value = Math.max(Ability.MinValue, Math.min(Ability.MaxValue, value));
  }

  public get modifier(): number {
    return Ability.getModifierValue(this.value);
  }

  public static getModifierValue(ability: number): number {
    return Math.floor((ability - 10) / 2);
  }
}
