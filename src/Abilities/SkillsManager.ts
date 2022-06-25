import { Pipeline } from '@benjamin_fdw/core';
import AttributeProxy from '../common/AttributeProxy';
import AbilitiesManager from './AbilitiesManager';
import Ability from './Ability';
import { SkillName } from './interfaces';
import { getAssociatedAbilityName } from './utils';

export default class SkillsManager {
  private _abilities: AbilitiesManager;

  private _pipelines: Map<SkillName, Pipeline<number, any>>;

  constructor(abilities: AbilitiesManager) {
    this._abilities = abilities;
    this._pipelines = new Map<SkillName, Pipeline<number, any>>();
  }

  public get pipelines(): Map<SkillName, Pipeline<number, any>> {
    return this.pipelines;
  }

  public getSkill(name: SkillName): AttributeProxy<number> {
    return new AttributeProxy<number>(
      this._abilities[getAssociatedAbilityName(name)],
      Ability.ModifierProxy,
      this._pipelines.get(name),
    );
  }
}
