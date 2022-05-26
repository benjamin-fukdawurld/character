import { Dice } from '@benjamin_fdw/dice';
import {
  Abilities,
  AbilitiesInitializer,
  AbilitiesManagerOptions,
  AbilityName,
  AbilityNames,
  SkillName,
  StatName,
  StatNames,
} from './interfaces';
import { getAssociatedAbilityName, isAbilities } from './utils';
import Ability from './Ability';

export default class AbilitiesManager {
  private _initiative: number;

  private _passivePerception: number;

  private _speed: number;

  private _darkVision: number;

  private _abilities: Map<AbilityName, Ability>;

  private _remainingAbilityPoints: number;

  public constructor(options: AbilitiesManagerOptions = {}) {
    this._speed = options.speed ?? 9;
    this._darkVision = options['dark vision'] ?? 0;
    this._initiative = options.initiative ?? 0;
    this._passivePerception = options['passive perception'] ?? 0;
    this._remainingAbilityPoints = options.remainingAbilityPoints ?? 0;

    this._abilities = AbilitiesManager.parseAbilities(options.abilities);
  }

  public static fromJSON(json: string): AbilitiesManager {
    return new AbilitiesManager(JSON.parse(json));
  }

  public toJSON() {
    const abilities = Object.fromEntries(
      AbilityNames.map((ability: AbilityName) => [
        ability,
        this.getAbility(ability).value,
      ]),
    );

    const stats = Object.fromEntries(
      StatNames.map((stat: StatName) => [stat, this[stat]]),
    );

    return JSON.stringify({
      abilities,
      ...stats,
    });
  }

  public get abilities() {
    return this._abilities;
  }

  public get strength(): Ability {
    return this._abilities.get('strength')!;
  }

  public get dexterity(): Ability {
    return this._abilities.get('dexterity')!;
  }

  public get constitution(): Ability {
    return this._abilities.get('constitution')!;
  }

  public get intelligence(): Ability {
    return this._abilities.get('intelligence')!;
  }

  public get wisdom(): Ability {
    return this._abilities.get('wisdom')!;
  }

  public get charisma(): Ability {
    return this._abilities.get('charisma')!;
  }

  public getAbility(key: AbilityName): Ability {
    return this._abilities.get(key)!;
  }

  public getSkillValue(key: SkillName): number {
    return this._abilities.get(getAssociatedAbilityName(key))!.modifier;
  }

  public get initiative(): number {
    return this._initiative;
  }

  public set initiative(value: number) {
    this._initiative = value;
  }

  public get 'passive perception'(): number {
    return this._passivePerception;
  }

  public set 'passive perception'(value: number) {
    this._passivePerception = value;
  }

  public get speed(): number {
    return this._speed;
  }

  public set speed(value: number) {
    this._speed = value;
  }

  public get 'armor class'(): number {
    return 10 + this.dexterity.modifier;
  }

  public get 'dark vision'(): number {
    return this._darkVision;
  }

  public set 'dark vision'(value: number) {
    this._darkVision = value;
  }

  public get remainingAbilityPoints(): number {
    return this._remainingAbilityPoints;
  }

  public set remainingAbilityPoints(value: number) {
    if (value < 0) {
      throw new Error(
        `Cannot set remaining ability points to a negative value (received: ${value})`,
      );
    }

    this._remainingAbilityPoints = value;
  }

  private static parseAbilities(
    abilities?: Abilities | AbilitiesInitializer,
  ): Map<AbilityName, Ability> {
    let abilityArray: [AbilityName, Ability][] = [];

    if (isAbilities(abilities)) {
      abilityArray = AbilityNames.map((name) => [
        name as AbilityName,
        new Ability((abilities as Abilities)[name as keyof Abilities]),
      ]);
    } else if (typeof abilities === 'function') {
      const initValue = abilities as AbilitiesInitializer;
      abilityArray = AbilityNames.map((name) => [
        name as AbilityName,
        new Ability(initValue(name as AbilityName)),
      ]);
    } else if (!abilities) {
      abilityArray = AbilityNames.map((name) => [
        name as AbilityName,
        new Ability(),
      ]);
    }

    return new Map<AbilityName, Ability>(abilityArray);
  }

  public static rollAbilityPoints(): number {
    const d = new Dice('4d6');

    return [...Array(6)]
      .map(() =>
        d
          .roll()
          .diceValues.sort()
          .slice(1)
          .reduce((current, dice) => current + dice, 0),
      )
      .reduce((total, diceRoll) => total + diceRoll, 0);
  }
}
