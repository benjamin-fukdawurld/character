import { Class } from '../Classes';
import Race from '../Races/Race';
import {
  AlignmentShort,
  ClassInformation,
  GenderName,
  InfoAttributes,
  InfoManagerOptions,
} from './interfaces';

export default class InfoManager implements InfoAttributes {
  public readonly name: string;

  public readonly age: number;

  public readonly gender: GenderName;

  public readonly race: Race;

  public readonly alignment: AlignmentShort;

  public readonly size: number;

  public readonly weight: number;

  public readonly biography: string;

  private _classes: ClassInformation[];

  private _experiencesPoints: number;

  constructor(options: InfoManagerOptions) {
    this.name = options.name;
    this.age = options.age ?? 21;
    this.gender = options.gender;
    this.race = options.race;
    this.alignment = options.alignment;
    this._classes = options.classes;
    this._experiencesPoints = 0;
    this.size = options.size ?? 1.65;
    this.weight = options.weight ?? 65;
    this.biography = options.biography ?? '';

    this['experiences points'] = options['experiences points'] ?? 0;
    if (this.age <= 0) {
      throw new Error('age cannot be a negative number or 0');
    }

    if (this.size <= 0) {
      throw new Error('size cannot be a negative number or 0');
    }

    if (this.weight <= 0) {
      throw new Error('weight cannot be a negative number or 0');
    }
  }

  public get classes(): ClassInformation[] {
    return this._classes;
  }

  public levelUp(characterClass: Class, value: number = 1) {
    if (value !== undefined && value <= 0) {
      throw new Error(
        `Character cannot level up, the number of level cannot be negative (received: ${value})`,
      );
    }

    const classInfo = this._classes.find((current) =>
      Object.is(current.characterClass, characterClass),
    );

    if (!classInfo) {
      throw new Error(
        `Character cannot level up, character is not of class ${characterClass.name}`,
      );
    }

    classInfo.level += value;
  }

  public get 'experiences points'(): number {
    return this._experiencesPoints;
  }

  public set 'experiences points'(value: number) {
    if (value < 0) {
      throw new Error(
        `experience points cannot be a negative value (received: ${value})`,
      );
    }

    this._experiencesPoints = value;
  }
}
