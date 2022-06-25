import { Pipeline } from '@benjamin_fdw/core';
import InfoManager from '../Info/InfoManager';

import {
  AbilitiesManager,
  AbilityModifierNames,
  AbilityName,
  AbilityNames,
  SkillNames,
  StatNames,
  AbilitiesProxyManager,
  StatName,
  SkillName,
} from '../Abilities';

import { CharacterAttributeName } from './interfaces';
import {
  HealthAttributeName,
  HealthAttributeNames,
  HealthManager,
} from '../Health';
import { InfoAttributeName, InfoAttributeNames } from '../Info/interfaces';

export default class AttributeManager<Env = any> {
  private _infoMgr: InfoManager;

  private _abilitiesMgr: AbilitiesManager;

  private _abilitiesProxyMgr: AbilitiesProxyManager;

  private _healthMgr: HealthManager;

  private _pipelines: Map<CharacterAttributeName, Pipeline<any, Env>>;

  private _savingThrowPipelines: Map<string, Pipeline<number, Env>>;

  constructor(options: {
    infoManager: InfoManager;
    abilitiesManager: AbilitiesManager;
    healthManager: HealthManager;
  }) {
    this._infoMgr = options.infoManager;

    this._abilitiesMgr = options.abilitiesManager;

    this._healthMgr = options.healthManager;

    this._pipelines = new Map<CharacterAttributeName, Pipeline<any, Env>>();

    this._savingThrowPipelines = new Map<string, Pipeline<number, Env>>();

    this._abilitiesProxyMgr = new AbilitiesProxyManager(this._abilitiesMgr);
  }

  public get infoManager(): InfoManager {
    return this._infoMgr;
  }

  public get abilitiesManager(): AbilitiesManager {
    return this._abilitiesMgr;
  }

  public get abilitiesProxyManager(): AbilitiesProxyManager {
    return this._abilitiesProxyMgr;
  }

  public get healthManager(): HealthManager {
    return this._healthMgr;
  }

  public get pipelines(): Map<CharacterAttributeName, Pipeline<any, Env>> {
    return this._pipelines;
  }

  public get savingThrowPipelines(): Map<string, Pipeline<number, Env>> {
    return this._savingThrowPipelines;
  }

  public getAttribute(attribute: CharacterAttributeName): any | null {
    if ((AbilityNames as readonly string[]).includes(attribute)) {
      return this._abilitiesMgr.getAbility(attribute as AbilityName).value;
    }

    if ((AbilityModifierNames as readonly string[]).includes(attribute)) {
      const ability = attribute.split(' ')[0] as AbilityName;
      return this._abilitiesMgr.getModifier(ability);
    }

    if (
      ([...SkillNames, ...StatNames] as readonly string[]).includes(attribute)
    ) {
      return this._abilitiesProxyMgr.get(attribute as SkillName | StatName);
    }

    if ((HealthAttributeNames as readonly string[]).includes(attribute)) {
      const healthValue = this._healthMgr[attribute as HealthAttributeName];
      return this.getProcessedAttribute(attribute, healthValue);
    }

    if ((InfoAttributeNames as readonly string[]).includes(attribute)) {
      const infoValue = this._infoMgr[attribute as InfoAttributeName];
      return this.getProcessedAttribute(attribute, infoValue);
    }

    return null;
  }

  public getSavingThrowValue(name: string, base: number): number {
    const pipeline = this._savingThrowPipelines.get(name);
    return pipeline ? pipeline.get(base) : base;
  }

  public getSavingThrowPipeline(
    name: string,
  ): Pipeline<number, Env> | undefined {
    return this._savingThrowPipelines.get(name);
  }

  private getProcessedAttribute<T = any>(
    attribute: CharacterAttributeName,
    value: T,
  ): T {
    const pipeline = this._pipelines.get(attribute);
    return pipeline ? pipeline.get(value) : value;
  }
}
