import { Pipeline } from '@benjamin_fdw/core';
import AttributeProxy from '../common/AttributeProxy';
import AbilitiesManager from './AbilitiesManager';
import Ability from './Ability';
import { SkillName, StatName } from './interfaces';
import { getAssociatedAbilityName } from './utils';

export default class AbilitiesProxyManager<Env = any> {
  private _abilities: AbilitiesManager;

  private _pipelines: Map<SkillName | StatName, Pipeline<number, Env>>;

  constructor(
    abilities: AbilitiesManager,
    pipelines: Map<SkillName | StatName, Pipeline<number, Env>> = new Map<
      SkillName | StatName,
      Pipeline<number, Env>
    >(),
  ) {
    this._abilities = abilities;
    this._pipelines = pipelines;
  }

  public get pipelines(): Map<SkillName | StatName, Pipeline<number, Env>> {
    return this.pipelines;
  }

  public get(name: SkillName | StatName): AttributeProxy<number, number, Env> {
    return new AttributeProxy<number, number, Env>(
      this._abilities[getAssociatedAbilityName(name)],
      Ability.ModifierProxy,
      this._pipelines.get(name),
    );
  }
}
