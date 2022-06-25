import {
  AbilityName,
  SkillName,
  StatName,
  AbilityNames,
  SkillNames,
  Abilities,
  AbilitiesInitializer,
  StatNames,
} from './interfaces';

export function getAssociatedAbilityName(
  name: SkillName | StatName,
): AbilityName {
  if (name === 'athletics') {
    return 'strength';
  }

  if (
    [
      'acrobatics',
      'sleight of hand',
      'stealth',
      'armor class',
      'initiative',
    ].includes(name)
  ) {
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
      'passive perception',
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

export function isStatName(prop: any): prop is StatName {
  return (
    typeof prop === 'string' &&
    (StatNames as readonly StatName[]).includes(prop as StatName)
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
