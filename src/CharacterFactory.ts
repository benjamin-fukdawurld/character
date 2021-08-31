import { Dice, DiceOptions } from 'fdw-dice';
import Attribute from './Attribute';
import Character from './Character';

interface CharacterClass {
  name: string;
  healthDice: DiceOptions;
  attributes: {
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
  };
}

interface CharacterInformation {
  name: string;
  characterClass: CharacterClass;
}

export default function createCharacter(info: CharacterInformation) {
  const attributes = { ...info.characterClass.attributes };
  const maxHealthPoints =
    info.characterClass.healthDice.size + (attributes.constitution as Attribute).modifier;
  const healthPoints = maxHealthPoints;
  return new Character({
    name: info.name,
    experiencePoints: 0,
    level: 1,
    healthDice: new Dice({ info.characterClass.healthDice }),
    healthPoints,
    maxHealthPoints,
    ...attributes,
  });
}
