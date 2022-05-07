import { Character as CharacterOptions, Race, CharacterClass } from '../interfaces';

export default class Character {
  readonly name: string;

  readonly race: Race;

  public characterClasses: CharacterClass[];

  public experiencePoints: number;

  public level: number[];

  public healthPoints: number;

  public maxHealthPoints: number;

  public strength: number;

  public dexterity: number;

  public constitution: number;

  public intelligence: number;

  public wisdom: number;

  public charisma: number;

  constructor(options: CharacterOptions) {
    this.name = options.name;
    this.race = options.race;
    this.characterClasses = options.characterClasses;
    this.level = options.level;
    this.experiencePoints = options.experiencePoints;
    this.healthPoints = options.healthPoints || this.characterClasses[0].healthDice.size;
    this.maxHealthPoints = options.maxHealthPoints || this.characterClasses[0].healthDice.size;
    this.strength = options.strength;
    this.dexterity = options.dexterity;
    this.constitution = options.constitution;
    this.intelligence = options.intelligence;
    this.wisdom = options.wisdom;
    this.charisma = options.charisma;
  }

  public getArmorClass(modifier: number): number {
    return 10 + modifier;
  }

  public static getModifier(ability: number): number {
    return Math.floor((ability - 10) / 2);
  }

  public get speed(): number {
    return this.race.speed;
  }

  public get darkVision(): number {
    return this.race.darkVision;
  }
}
