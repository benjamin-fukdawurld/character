import { Pipeline } from '@benjamin_fdw/core';
import AbilitiesManager from './AbilitiesManager';
import { StatName } from './interfaces';
import { getAssociatedAbilityName } from './utils';

export default class StatsManager {
  private _abilities: AbilitiesManager;

  private _pipelines: Map<StatName, Pipeline<number, any>>;

  constructor(abilities: AbilitiesManager) {
    this._abilities = abilities;
    this._pipelines = new Map<StatName, Pipeline<number, any>>();
  }

  public get pipelines(): Map<StatName, Pipeline<number, any>> {
    return this.pipelines;
  }

  public getStat(name: StatName) {
    const pipeline = this._pipelines.get(name);
    const value =
      10 + this._abilities.getModifier(getAssociatedAbilityName(name));
    return pipeline ? pipeline.get(value) : value;
  }
}
