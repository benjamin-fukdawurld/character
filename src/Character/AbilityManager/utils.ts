import { SkillNames, AbilityNames } from './interfaces';

export function getAssociatedAbilityName(name: SkillNames): AbilityNames {
  if (name === 'athletics') {
    return 'strength';
  }

  if (['acrobatics', 'sleight of hand', 'stealth'].includes(name)) {
    return 'dexterity';
  }

  if (['arcana', 'history', 'investigation', 'nature', 'religion'].includes(name)) {
    return 'intelligence';
  }

  if (['animal handling', 'insight', 'medicine', 'perception', 'survival'].includes(name)) {
    return 'wisdom';
  }

  if (['deception', 'intimidation', 'performance', 'persuasion'].includes(name)) {
    return 'charisma';
  }

  throw new Error(`Invalid skill name (received: ${name})`);
}

export default { getAssociatedAbilityName };
