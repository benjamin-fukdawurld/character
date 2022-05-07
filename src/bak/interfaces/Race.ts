import { AlignmentShort } from './Alignment';
import { Skill } from './Skill';
import { Proficiency, ProficiencySlot } from './Proficiency';
import { Abilities, AbilitySlot } from './Abilities';

export type RaceSize = 'S' | 'M' | 'L' | 'XL';

export interface Race {
  name: string;
  alignments: AlignmentShort[];
  size: RaceSize;
  speed: number;
  darkVision: number;
  skills: Skill[];
  resistance: [string, number][];
  savingThrows: [string, string][];
  longRestDuration: number;
  proficiencies: Proficiency[];
  proficiencySlots: [string, ProficiencySlot][];
  abilities: Abilities;
  abilitySlot: AbilitySlot[];

  eventHandlers: Map<string, (env: any) => void>;
}
