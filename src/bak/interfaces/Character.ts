import { Race } from './Race';
import { CharacterClass } from './CharacterClass';

export interface Character {
  name: string;
  race: Race;
  characterClasses: CharacterClass[];
  healthPoints?: number;
  maxHealthPoints?: number;
  experiencePoints: number;
  level: number[];
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
