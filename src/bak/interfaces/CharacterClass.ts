import { Dice } from 'fdw-dice';
import { Proficiency } from './Proficiency';
import { Skill } from './Skill';
import CharacterHandler from '../Character/CharacterHandler';

export interface CharacterClass {
  name: string;
  healthDice: Dice;
  proficiencies: Proficiency[];
  savingThrows: [string, string][];
  skills: Skill[];

  eventHandlers: [string, (character: CharacterHandler, ...args: any[]) => void][];
}
