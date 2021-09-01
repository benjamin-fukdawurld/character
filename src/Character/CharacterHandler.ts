import EventEmitter from 'events';
import { Dice } from 'fdw-dice';

import Character from './Character';
import AbstractCharacterDecorator from './AbstractCharacterDecorator';
import { CharacterAPI } from './CharacterAPI';
import { Race, CharacterClass } from '../interfaces';

import experience from './Experience';

export default class CharacterHandler extends EventEmitter {
  public character: Character;

  public characterAccess: CharacterAPI;

  constructor(character: Character) {
    super();
    this.character = character;
    this.characterAccess = character;
  }

  addDecorator(decorator: AbstractCharacterDecorator) {
    this.characterAccess = decorator as CharacterAPI;
  }

  public get name(): string {
    return this.characterAccess.name;
  }

  public get race(): Race {
    return this.characterAccess.race;
  }

  public get characterClasses(): CharacterClass[] {
    return this.characterAccess.characterClasses;
  }

  public get level(): number {
    return this.characterAccess.level[0];
  }

  public get experiencePoints(): number {
    return this.characterAccess.experiencePoints;
  }

  public addExperience(expPoints: number): void {
    this.character.experiencePoints += expPoints;
    if (this.hasLevelUp()) {
      do {
        this.character.level = this.character.level.map((lvl: number) => lvl + 1);
        this.emit('Character.levelUp', this, this.level);
      } while (this.hasLevelUp);
    }
  }

  public get armorClass(): number {
    return this.characterAccess.getArmorClass(this.dexterityModifier);
  }

  public get speed(): number {
    return this.race.speed;
  }

  public get darkVision(): number {
    return this.race.darkVision;
  }

  public get strength(): number {
    return this.characterAccess.strength;
  }

  public set strength(value: number) {
    const modifier = this.strengthModifier;
    this.character.strength = CharacterHandler.clampAttribute(value);
    this.checkModifier(modifier, value, 'strength');
  }

  public get strengthModifier(): number {
    return Character.getModifier(this.characterAccess.strength);
  }

  public get dexterity(): number {
    return this.characterAccess.dexterity;
  }

  public set dexterity(value: number) {
    const modifier = this.dexterityModifier;
    this.character.dexterity = CharacterHandler.clampAttribute(value);
    this.checkModifier(modifier, value, 'dexterity');
  }

  public get dexterityModifier(): number {
    return Character.getModifier(this.characterAccess.dexterity);
  }

  public get constitution(): number {
    return this.characterAccess.constitution;
  }

  public set constitution(value: number) {
    const modifier = this.constitutionModifier;
    this.character.constitution = CharacterHandler.clampAttribute(value);
    this.checkModifier(modifier, value, 'constitution');
  }

  public get constitutionModifier(): number {
    return Character.getModifier(this.characterAccess.constitution);
  }

  public get intelligence(): number {
    return this.characterAccess.intelligence;
  }

  public set intelligence(value: number) {
    const modifier = this.intelligenceModifier;
    this.character.intelligence = CharacterHandler.clampAttribute(value);
    this.checkModifier(modifier, value, 'intelligence');
  }

  public get intelligenceModifier(): number {
    return Character.getModifier(this.characterAccess.intelligence);
  }

  public get wisdom(): number {
    return this.characterAccess.wisdom;
  }

  public set wisdom(value: number) {
    const modifier = this.wisdomModifier;
    this.character.wisdom = CharacterHandler.clampAttribute(value);
    this.checkModifier(modifier, value, 'wisdom');
  }

  public get wisdomModifier(): number {
    return Character.getModifier(this.characterAccess.wisdom);
  }

  public get charisma(): number {
    return this.characterAccess.charisma;
  }

  public set charisma(value: number) {
    const modifier = this.charismaModifier;
    this.character.charisma = CharacterHandler.clampAttribute(value);
    this.checkModifier(modifier, value, 'charisma');
  }

  public get charismaModifier(): number {
    return Character.getModifier(this.characterAccess.charisma);
  }

  public get healthDice(): Dice {
    return this.characterAccess.characterClasses[0].healthDice;
  }

  public get healthPoints(): number {
    return this.characterAccess.healthPoints;
  }

  public set healthPoints(value: number) {
    this.character.healthPoints = value;
    if (value < 1) {
      this.emit('health.noHp', { target: this });
    }

    if (value > this.characterAccess.maxHealthPoints) {
      this.character.healthPoints = this.characterAccess.maxHealthPoints;
      this.emit('health.fullHp', { target: this });
    }
  }

  public get maxHealthPoints(): number {
    return this.characterAccess.maxHealthPoints;
  }

  public set maxHealthPoints(value: number) {
    if (value < 1) {
      throw new Error('max health points must be a positive integer');
    }

    this.character.maxHealthPoints = value;
    if (value < this.character.healthPoints) {
      this.character.healthPoints = this.character.maxHealthPoints;
    }
  }

  private static clampAttribute(value: number): number {
    return Math.max(1, Math.min(30, value));
  }

  private checkModifier(oldValue: number, ability: number, abilityName: string) {
    if (oldValue !== this.strengthModifier) {
      this.emit(`${abilityName}.modifierChanged`, {
        target: this,
        oldValue,
        newValue: this.strengthModifier,
      });
    }
  }

  private hasLevelUp(): boolean {
    return this.experiencePoints >= experience.experienceSteps[this.level];
  }
}
