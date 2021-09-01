import { CharacterAPI } from './CharacterAPI';
import { Race, CharacterClass } from '../interfaces';

export default abstract class AbstractCharacterDecorator implements CharacterAPI {
  public target: CharacterAPI;

  constructor(target: CharacterAPI) {
    this.target = target;
  }

  get name(): string {
    return this.target.name;
  }

  get race(): Race {
    return this.target.race;
  }

  get characterClasses(): CharacterClass[] {
    return this.target.characterClasses;
  }

  get level(): number[] {
    return this.target.level;
  }

  get experiencePoints(): number {
    return this.target.experiencePoints;
  }

  getArmorClass(modifier: number): number {
    return this.target.getArmorClass(modifier);
  }

  get speed(): number {
    return this.target.speed;
  }

  get darkVision(): number {
    return this.target.darkVision;
  }

  get healthPoints(): number {
    return this.target.healthPoints;
  }

  get maxHealthPoints(): number {
    return this.target.maxHealthPoints;
  }

  get strength(): number {
    return this.target.strength;
  }

  get dexterity(): number {
    return this.target.dexterity;
  }

  get constitution(): number {
    return this.target.constitution;
  }

  get intelligence(): number {
    return this.target.intelligence;
  }

  get wisdom(): number {
    return this.target.wisdom;
  }

  get charisma(): number {
    return this.target.charisma;
  }
}
