import { MiddleWare } from '@benjamin_fdw/core';
import { Dice } from '@benjamin_fdw/dice';
import {
  Abilities,
  AbilitiesInitializer,
  AbilitiesManagerOptions,
  Ability,
  AbilityName,
  AbilityNames,
} from '../Abilities';
import { CharacterOptions } from '../Character';
import { HealthManagerOptions } from '../Health';

export const defaultCharacterOptions: () => Partial<CharacterOptions> = () => ({
  name: '',
  age: 20,
  gender: 'male',
  alignment: 'N',
  size: 1.7,
  weight: 65,
  'experiences points': 0,
  'dark vision': 0,
  'passive perception': 0,
  remainingPoints: 0,
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
  'hit dice': '',
  savingThrows: new Map<string, number>(),
  savingThrowPipelines: new Map<string, MiddleWare<number, any>[]>(),
  proficiencies: new Map<string, number>(),
  proficiencyPipelines: new Map<string, MiddleWare<number, any>[]>(),
  skills: new Map<string, any>(),
  features: new Map<string, any>(),
  equipment: new Map<string, any>(),
  bonusActions: new Map<string, any>(),
});

export function buildAbilityMiddleware(abilities: AbilitiesManagerOptions) {
  const mw = (
    options: Partial<CharacterOptions>,
  ): Partial<CharacterOptions> => {
    const result = options;
    AbilityNames.forEach((value: AbilityName) => {
      if (typeof abilities === 'function') {
        const initializer = abilities as AbilitiesInitializer;
        (result as Abilities)[value] = initializer(value);
      } else {
        const outputAbilities = result as Abilities;
        outputAbilities[value] += (abilities as Abilities)[value];
      }
    });

    result['constitution bonus'] = Ability.getModifierValue(
      (result as Abilities).constitution!,
    );

    return result;
  };

  mw.priority = 2;

  return mw;
}

export function buildHealthMiddleware(
  health: Omit<HealthManagerOptions, 'hit dice'> & { 'hit dice'?: 'string' },
) {
  const mw = (
    options: Partial<CharacterOptions>,
  ): Partial<CharacterOptions> => {
    const result = options;
    result['hit dice'] = health['hit dice'] || result['hit dice'];
    result['constitution bonus'] =
      health['constitution bonus'] || result['constitution bonus'];
    result['current hit points'] =
      health['current hit points'] || result['current hit points'];
    result['hit point max'] =
      health['hit point max'] || result['hit point max'];
    result['temporary hit points'] =
      health['temporary hit points'] || result['temporary hit points'];
    result['total hit dice'] =
      health['total hit dice'] || result['total hit dice'];

    return result;
  };

  mw.priority = 3;

  return mw;
}

export function BonusMiddleWare(value: number = 1) {
  const mw = (current: number) => current + value;
  mw.priority = 1;

  return mw;
}

function advantageMiddleWarImpl(
  dice: string | Dice,
  picker: (a: number, b: number) => number,
) {
  const d = typeof dice === 'string' ? new Dice(dice) : dice;

  const mw = (value: number) => picker(value, d.roll().total);
  mw.priority = 0;

  return mw;
}

export function AdvantageMiddleWare(dice: string | Dice = '1d20') {
  return advantageMiddleWarImpl(dice, Math.max);
}

export function DisadvantageMiddleWare(dice: Dice) {
  return advantageMiddleWarImpl(dice, Math.min);
}
