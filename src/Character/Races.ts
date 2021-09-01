import { Race } from '../interfaces/Race';

const elf: Race = {
  name: 'elf',
  alignments: ['CG', 'CN', 'CE', 'NG', 'N', 'NE'],
  size: 'M',
  speed: 9,
  darkVision: 18,
  skills: [],
  resistance: [],
  savingThrows: [
    ['charm', 'advantage'],
    ['magic sleep', 'resist'],
  ],
  longRestDuration: 4,
  proficiencies: [{ name: 'keen senses', value: 1 }],
  proficiencySlots: [],
  abilities: {
    strength: 0,
    dexterity: 2,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  abilitySlot: [],
  eventHandlers: new Map<string, (env: any) => void>(),
};

const allRaces = [elf];

export default { elf, allRaces };
