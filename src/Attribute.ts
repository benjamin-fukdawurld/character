export default class Attribute {
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
    return Math.floor((this.mValue - 10) / 2);
  }
}
