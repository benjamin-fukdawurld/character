import { MiddleWare } from '@benjamin_fdw/core';
import EventEmitter from 'eventemitter3';
import {
  AbilitiesManagerOptions,
  AbilityName,
  SkillName,
  StatName,
} from '../Abilities';

import { HealthAttributeName, HealthManagerOptions } from '../Health';

export interface CharacterEvent {
  name: string;
}

export type CharacterAttributeName =
  | AbilityName
  | SkillName
  | StatName
  | HealthAttributeName;

export type CharacterEventNames = 'combat engaged' | 'surprised' | 'attacked';

export interface CharacterInformation {
  name: string;
  races: string[];
  classes: {
    name: string;
    level: number;
  }[];
  experience: number;
  size: string;
  longRestDuration: number;
}

export interface CharacterOptions {
  id?: string;
  info: CharacterInformation;
  health: HealthManagerOptions;
  abilities: AbilitiesManagerOptions;
  savingThrows: Map<string, number>;
  savingThrowPipelines: Map<string, MiddleWare<number, any>[]>;
  proficiencies: Map<string, number>;
  proficiencyPipelines: Map<string, MiddleWare<number, any>[]>;

  skills: Map<string, any>;
  features: Map<string, any>;
  equipment: Map<string, any>;
  bonusActions: Map<string, any>;
}

export interface IBaseCharacter {
  readonly id: string;
  readonly info: CharacterInformation;
  readonly getAttribute: <T = any>(
    attribute: CharacterAttributeName,
  ) => T | null;
}

export type ICharacter = IBaseCharacter &
  EventEmitter<CharacterEventNames, ICharacter>;
