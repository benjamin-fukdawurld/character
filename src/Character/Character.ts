import { Pipeline } from '@benjamin_fdw/core';
import EventEmitter from 'eventemitter3';
import { v4 as uuid } from 'uuid';

import {
  Abilities,
  AbilitiesManager,
  AbilityName,
  AbilityNames,
} from '../Abilities';

import {
  CharacterAttributeName,
  CharacterOptions,
  CharacterEventNames,
  ICharacter,
} from './interfaces';
import { HealthManager } from '../Health';
import InfoManager from '../Info/InfoManager';
import AttributeManager from './AttributeManager';

export default class Character
  extends EventEmitter<CharacterEventNames, Character>
  implements ICharacter
{
  public readonly id: string;

  private _attributeMgr: AttributeManager<Character>;

  public constructor(options: CharacterOptions) {
    super();
    this.id = options.id ?? uuid();
    this._attributeMgr = new AttributeManager({
      infoManager: new InfoManager(options),
      abilitiesManager: new AbilitiesManager(options),
      healthManager: new HealthManager(options),
    });
  }

  public get infoManager(): InfoManager {
    return this._attributeMgr.infoManager;
  }

  public get abilitiesManager(): AbilitiesManager {
    return this._attributeMgr.abilitiesManager;
  }

  public get healthManager(): HealthManager {
    return this._attributeMgr.healthManager;
  }

  public get pipelines(): Map<
    CharacterAttributeName,
    Pipeline<any, Character>
  > {
    return this._attributeMgr.pipelines;
  }

  public getAttribute<T = any>(attribute: CharacterAttributeName): T | null {
    return this._attributeMgr.getAttribute(attribute);
  }

  public getSavingThrow(name: string, value: number): number {
    return this._attributeMgr.getSavingThrowPipeline(name)?.get(value) ?? value;
  }

  public get abilities(): Abilities {
    return Object.fromEntries(
      AbilityNames.map((name: AbilityName) => [
        name,
        this.getAttribute<number>(name),
      ]),
    ) as Abilities;
  }

  public set abilities(value: Abilities) {
    AbilityNames.forEach((name: AbilityName) => {
      this._attributeMgr.abilitiesManager[name].rawValue = value[name];
    });
  }
}
