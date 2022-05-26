import { MiddleWare, Pipeline } from '@benjamin_fdw/core';
import {
  Abilities,
  AbilitiesInitializer,
  AbilitiesManagerOptions,
  Ability,
  AbilityName,
  AbilityNames,
} from './Abilities';
import { CharacterOptions } from './Character';
import { HealthManagerOptions } from './Health';

export const defaultCharacterOptions: () => CharacterOptions = () => ({
  abilities: {
    'dark vision': 0,
    'passive perception': 0,
    remainingAbilityPoints: 0,
    initiative: 0,
    speed: 0,
    abilities: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      wisdom: 0,
      intelligence: 0,
      charisma: 0,
    },
  },
  health: {
    'hit dice': '',
  },
  info: {
    name: '',
    races: [],
    classes: [],
    experience: 0,
    longRestDuration: 0,
    size: '',
  },
  savingThrows: new Map<string, number>(),
  savingThrowPipelines: new Map<string, MiddleWare<number, any>[]>(),
  proficiencies: new Map<string, number>(),
  proficiencyPipelines: new Map<string, MiddleWare<number, any>[]>(),
  skills: new Map<string, any>(),
  features: new Map<string, any>(),
  equipment: new Map<string, any>(),
  bonusActions: new Map<string, any>(),
});

export type BuilderMiddleWare<Env = void> = MiddleWare<CharacterOptions, Env>;

export class BuilderPipeline<Env = void> extends Pipeline<
  CharacterOptions,
  Env
> {}

export function buildAbilityMiddleware(abilities: AbilitiesManagerOptions) {
  const mw = (options: CharacterOptions): CharacterOptions => {
    const result = options;
    AbilityNames.forEach((value: AbilityName) => {
      if (typeof abilities === 'function') {
        const initializer = abilities as AbilitiesInitializer;
        (result.abilities.abilities as Abilities)[value] = initializer(value);
      } else {
        const outputAbilities = result.abilities.abilities as Abilities;
        outputAbilities[value] += (abilities as Abilities)[value];
      }
    });

    result.health['constitution bonus'] = Ability.getModifierValue(
      (result.abilities.abilities as Abilities).constitution!,
    );

    return result;
  };

  mw.priority = 2;

  return mw;
}

export function buildHealthMiddleware(
  health: Omit<HealthManagerOptions, 'hit dice'> & { 'hit dice'?: 'string' },
) {
  const mw = (options: CharacterOptions): CharacterOptions => {
    const result = options;
    result.health['hit dice'] = health['hit dice'] || result.health['hit dice'];
    result.health['constitution bonus'] =
      health['constitution bonus'] || result.health['constitution bonus'];
    result.health['current hit points'] =
      health['current hit points'] || result.health['current hit points'];
    result.health['hit point max'] =
      health['hit point max'] || result.health['hit point max'];
    result.health['temporary hit points'] =
      health['temporary hit points'] || result.health['temporary hit points'];
    result.health['total hit dice'] =
      health['total hit dice'] || result.health['total hit dice'];

    return result;
  };

  mw.priority = 3;

  return mw;
}
