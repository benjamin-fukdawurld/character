import EventEmitter from 'events';
import { Dice } from 'fdw-dice';
import Ability from './Ability';

interface HealthOptions {
  healthDice: Dice;
  constitution: Ability;
  maxHealthPoints?: number;
  healthPoints?: number;
}

export default class Health extends EventEmitter {
  private mHealthDice: Dice;

  private mHealthPoints: number;

  private mMaxHealthPoints: number;

  private mConstitution: Ability;

  constructor(options: HealthOptions) {
    super();
    this.mHealthDice = options.healthDice;
    this.mConstitution = options.constitution;
    this.mMaxHealthPoints =
      options.maxHealthPoints || this.mHealthDice.size + options.constitution.modifier;
    this.mHealthPoints = options.healthPoints || this.mMaxHealthPoints;
  }

  get healthPoints() {
    return this.mHealthPoints;
  }

  set healthPoints(value: number) {
    this.mHealthPoints = value;
    if (this.mHealthPoints < 1) {
      this.emit('no-hp', this);
    }

    if (this.mHealthPoints >= this.mMaxHealthPoints) {
      this.mHealthPoints = this.mMaxHealthPoints;
      this.emit('full-hp', this);
    }
  }

  get maxHealthPoints(): number {
    return this.mMaxHealthPoints;
  }

  set maxHealthPoints(value: number) {
    if (value < 1) {
      throw new Error(`maxHealthPoints mus be a positive integer, received: '${value}'`);
    }

    this.mMaxHealthPoints = value;
    if (this.mHealthPoints > this.mMaxHealthPoints) {
      this.mHealthPoints = this.mMaxHealthPoints;
    }
  }

  get constitution(): Ability {
    return this.mConstitution;
  }

  get healthDice(): Dice {
    return this.mHealthDice;
  }
}
