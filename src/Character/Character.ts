import EventEmitter from 'eventemitter3';
import { v4 as uuid } from 'uuid';

import { Pipeline } from '@benjamin_fdw/core';

import {
  AbilityName,
  AbilityNames,
  SkillName,
  SkillNames,
  AbilitiesManager,
  StatNames,
  StatName,
} from '../Abilities';

import {
  CharacterAttributeName,
  CharacterInformation,
  CharacterOptions,
  CharacterEventNames,
  ICharacter,
} from './interfaces';
import {
  HealthAttributeName,
  HealthAttributeNames,
  HealthManager,
} from '../Health';

export default class Character
  extends EventEmitter<CharacterEventNames, Character>
  implements ICharacter
{
  public readonly id: string;

  public _info: CharacterInformation;

  public _healthManager: HealthManager;

  private _abilitiesManager: AbilitiesManager;

  private _attributesPipelines: Map<
    CharacterAttributeName,
    Pipeline<any, Character>
  >;

  private _savingThrows: Map<string, number>;

  private _savingThrowsPipelines: Map<string, Pipeline<number, Character>>;

  public constructor(options: CharacterOptions) {
    super();
    this.id = options.id ?? uuid();
    this._info = options.info;
    this._abilitiesManager = new AbilitiesManager(options.abilities);
    this._healthManager = new HealthManager(options.health);
    this._attributesPipelines = new Map<
      CharacterAttributeName,
      Pipeline<any, Character>
    >();

    this._savingThrows = new Map<string, number>();
    this._savingThrowsPipelines = new Map<
      string,
      Pipeline<number, Character>
    >();
  }

  public get info(): CharacterInformation {
    return this._info;
  }

  public get abilitiesManager(): AbilitiesManager {
    return this._abilitiesManager;
  }

  public getAttribute<T = any>(attribute: CharacterAttributeName): T | null {
    if ((AbilityNames as readonly string[]).includes(attribute)) {
      const abilityValue = this._abilitiesManager.getAbility(
        attribute as AbilityName,
      ).value;
      return (this._attributesPipelines.get(attribute)?.get(abilityValue) ??
        abilityValue) as T;
    }

    if ((SkillNames as readonly string[]).includes(attribute)) {
      const skillValue = this._abilitiesManager.getSkillValue(
        attribute as SkillName,
      );
      return (this._attributesPipelines.get(attribute)?.get(skillValue) ??
        skillValue) as T;
    }

    if ((StatNames as readonly string[]).includes(attribute)) {
      const stateValue = this._abilitiesManager[attribute as StatName];
      return (this._attributesPipelines.get(attribute)?.get(stateValue) ??
        stateValue) as T;
    }

    if ((HealthAttributeNames as readonly string[]).includes(attribute)) {
      const healthValue = this._healthManager[attribute as HealthAttributeName];
      return (this._attributesPipelines.get(attribute)?.get(healthValue) ??
        healthValue) as T;
    }

    return null;
  }

  public get isAlive(): boolean {
    return this.id !== '';
  }
}
