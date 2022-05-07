export default class Ability {
  private mValue: number = 1;

  constructor(value: number = 1) {
    this.value = value;
  }

  get value(): number {
    return this.mValue;
  }

  set value(value) {
    this.mValue = Math.max(1, Math.min(30, value));
  }

  get modifier(): number {
    return Ability.getModifier(this.mValue);
  }

  static getModifier(ability: number): number {
    return Math.floor((ability - 10) / 2);
  }
}
