import { RaceOptions } from './interfaces';

import Race from './Race';

const DwarfRaceOptions: RaceOptions = {
  name: 'dwarf',
  'size label': 'm',
  'size range': { min: 1.2, max: 1.5 },
  speed: 7.5,
  'dark vision': 18,
  abilities: {
    strength: 0,
    dexterity: 0,
    constitution: 2,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  languages: ['common', 'dwarvish'],
  feats: [
    'resist poison',
    'resist poison damage',
    'proficiency to dwarf weapons',
    'tool proficiency',
    'stonecunning',
  ],
};

const DwarfRace = new Race(DwarfRaceOptions);
export default DwarfRace;
