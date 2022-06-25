import { Dice } from '@benjamin_fdw/dice';

import {
  Abilities,
  AbilitiesManagerOptions,
  AbilityName,
  AbilityNames,
} from './interfaces';
import Ability from './Ability';

export default class AbilitiesManager implements Abilities<Ability> {
  private _strength: Ability;

  private _dexterity: Ability;

  private _constitution: Ability;

  private _wisdom: Ability;

  private _intelligence: Ability;

  private _charisma: Ability;

  private _remainingAbilityPoints: number;

  public constructor(options: AbilitiesManagerOptions = {}) {
    this._strength = new Ability(options.strength);
    this._dexterity = new Ability(options.dexterity);
    this._constitution = new Ability(options.constitution);
    this._wisdom = new Ability(options.wisdom);
    this._intelligence = new Ability(options.intelligence);
    this._charisma = new Ability(options.charisma);
    this._remainingAbilityPoints = options.remainingPoints ?? 0;
  }

  public get strength(): Ability {
    return this._strength;
  }

  public get dexterity(): Ability {
    return this._dexterity;
  }

  public get constitution(): Ability {
    return this._constitution;
  }

  public get wisdom(): Ability {
    return this._wisdom;
  }

  public get intelligence(): Ability {
    return this._intelligence;
  }

  public get charisma(): Ability {
    return this._charisma;
  }

  public get 'remaining points'(): number {
    return this._remainingAbilityPoints;
  }

  public set 'remaining points'(value: number) {
    if (value < 0) {
      throw new Error(
        `Cannot set remaining ability points to a negative value (received: ${value})`,
      );
    }

    this._remainingAbilityPoints = value;
  }

  public getAbility(name: AbilityName): Ability {
    return this[name];
  }

  public setAbility(name: AbilityName, value: number): AbilitiesManager {
    this[name].rawValue = value;

    return this;
  }

  public setAbilities(abilities: Abilities<number>) {
    AbilityNames.map((ability: AbilityName) =>
      this.setAbility(ability, abilities[ability]),
    );
  }

  public getModifier(name: AbilityName): number {
    return this[name].modifier;
  }

  public static fromJSON(json: string): AbilitiesManager {
    return new AbilitiesManager(JSON.parse(json));
  }

  public toJSON() {
    return JSON.stringify(
      Object.fromEntries([
        ...AbilityNames.map((ability: AbilityName) => [
          ability,
          this[ability].rawValue,
        ]),
        ['remaining points', this._remainingAbilityPoints],
      ]),
    );
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
