import { MiddleWare } from '@benjamin_fdw/core';
import EventEmitter from 'eventemitter3';
import {
  Abilities,
  AbilitiesManagerOptions,
  AbilityModifierName,
  AbilityName,
  SkillName,
  StatName,
} from '../Abilities';

import { HealthAttributeName, HealthManagerOptions } from '../Health';
import { InfoAttributeName, InfoManagerOptions } from '../Info/interfaces';

export interface CharacterEvent {
  name: string;
}

export type CharacterAttributeName =
  | AbilityName
  | AbilityModifierName
  | SkillName
  | StatName
  | HealthAttributeName
  | InfoAttributeName;

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

export interface CharacterOptions
  extends InfoManagerOptions,
    HealthManagerOptions,
    AbilitiesManagerOptions {
  id?: string;
  savingThrows: Map<string, number>;
  savingThrowPipelines: Map<string, MiddleWare<number, any>[]>;
  proficiencies: Map<string, number>;
  proficiencyPipelines: Map<string, MiddleWare<number, any>[]>;

  speed: number;
  'dark vision': number;

  skills: Map<string, any>;
  features: Map<string, any>;
  equipment: Map<string, any>;
  bonusActions: Map<string, any>;
}

export interface IBaseCharacter {
  readonly id: string;
  readonly getAttribute: <T = any>(
    attribute: CharacterAttributeName,
  ) => T | null;
  abilities: Abilities;
}

export type ICharacter = IBaseCharacter &
  EventEmitter<CharacterEventNames, ICharacter>;
