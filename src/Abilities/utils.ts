import {
  AbilityName,
  SkillName,
  AbilityNames,
  SkillNames,
  Abilities,
  AbilitiesInitializer,
} from './interfaces';

export function getAssociatedAbilityName(name: SkillName): AbilityName {
  if (name === 'athletics') {
    return 'strength';
  }

  if (['acrobatics', 'sleight of hand', 'stealth'].includes(name)) {
    return 'dexterity';
  }

  if (
    ['arcana', 'history', 'investigation', 'nature', 'religion'].includes(name)
  ) {
    return 'intelligence';
  }

  if (
    [
      'animal handling',
      'insight',
      'medicine',
      'perception',
      'survival',
    ].includes(name)
  ) {
    return 'wisdom';
  }

  if (
    ['deception', 'intimidation', 'performance', 'persuasion'].includes(name)
  ) {
    return 'charisma';
  }

  throw new Error(`Invalid skill name (received: ${name})`);
}

export function isAbilityName(prop: any): prop is AbilityName {
  return (
    typeof prop === 'string' &&
    (AbilityNames as readonly AbilityName[]).includes(prop as AbilityName)
  );
}

export function isSkillName(prop: any): prop is SkillName {
  return (
    typeof prop === 'string' &&
    (SkillNames as readonly SkillName[]).includes(prop as SkillName)
  );
}

export function isAbilities(data: any): data is Abilities {
  return (
    AbilityNames.filter((current) => !(current in (data ?? {}))).length === 0
  );
}

export function toAbilities(initializer: AbilitiesInitializer): Abilities {
  return Object.fromEntries(
    AbilityNames.map((ability) => [ability, initializer(ability)]),
  ) as Abilities;
}
