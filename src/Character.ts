import { EventEmitter } from 'events';
import { Dice } from 'fdw-dice';
import Attribute from './Attribute';
import { CharacterAttributes } from './CharacterAttributes';

interface CharacterOptions {
  name: string;
  experiencePoints: number;
  level: number;
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;

  healthDice: Dice;
  healthPoints: number;
  maxHealthPoints: number;
}

export default class Character extends EventEmitter {
  private mName: string;

  private mLevel: number;

  private mExperiencePoints: number;

  private mAttributes: CharacterAttributes;

  private mHealthDice: Dice;

  private mHealthPoints: number;

  private mMaxHealthPoints: number;

  public static readonly experienceSteps = [
    300, 900, 2700, 6500, 14000, 23000, 36000, 48000, 64000, 85000, 100000, 120000, 140000, 165000,
    195000, 225000, 265000, 305000, 355000,
  ];

  constructor(options: CharacterOptions) {
    super();
    this.mName = options.name;
    this.mLevel = options.level;
    this.mExperiencePoints = options.experiencePoints;
    this.mHealthDice = options.healthDice;
    this.mMaxHealthPoints = options.maxHealthPoints;
    this.mHealthPoints = options.healthPoints;

    this.mAttributes = {
      strength: new Attribute(options.strength),
      dexterity: new Attribute(options.dexterity),
      constitution: new Attribute(options.constitution),
      intelligence: new Attribute(options.intelligence),
      wisdom: new Attribute(options.wisdom),
      charisma: new Attribute(options.charisma),
    };
  }

  public get name(): string {
    return this.mName;
  }

  public get level(): number {
    return this.mLevel;
  }

  public get experiencePoints(): number {
    return this.mExperiencePoints;
  }

  public addExperience(expPoints: number): void {
    this.mExperiencePoints += expPoints;
    if (this.hasLevelUp()) {
      do {
        ++this.mLevel;
        this.emit('levelUp', this, this.mLevel);
      } while (this.hasLevelUp);
    }
  }

  public get attributes(): CharacterAttributes {
    return this.mAttributes;
  }

  public get healthDice(): Dice {
    return this.healthDice;
  }

  public getHealthPoints(): number {
    return this.mHealthPoints;
  }

  public addToHealthPoint(value: number) {
    this.mHealthPoints += value;
    if (this.mHealthPoints > this.mMaxHealthPoints) {
      this.mHealthPoints = this.mMaxHealthPoints;
      return;
    }

    if (this.mHealthPoints <= 0) {
      this.emit('no-hp', this);
    }
  }

  public getMaxHealthPoints(): number {
    return this.mMaxHealthPoints;
  }

  private hasLevelUp(): boolean {
    return this.mExperiencePoints >= Character.experienceSteps[this.mLevel];
  }
}
