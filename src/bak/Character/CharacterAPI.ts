import { Race, CharacterClass } from '../interfaces';

export interface CharacterAPI {
  readonly name: string;
  readonly race: Race;
  readonly characterClasses: CharacterClass[];
  readonly level: number[];
  readonly experiencePoints: number;
  readonly speed: number;
  readonly darkVision: number;
  readonly healthPoints: number;
  readonly maxHealthPoints: number;
  readonly strength: number;
  readonly dexterity: number;
  readonly constitution: number;
  readonly intelligence: number;
  readonly wisdom: number;
  readonly charisma: number;

  getArmorClass: (modifier: number) => number;
}
