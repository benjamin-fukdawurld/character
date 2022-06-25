import { RaceOptions } from './interfaces';

import Race from './Race';

const HalfElfRaceOptions: RaceOptions = {
  name: 'half-elf',
  'size label': 'm',
  'size range': { min: 1.5, max: 1.85 },
  speed: 9,
  'dark vision': 18,
  'long rest duration': 4,
  abilities: {
    strength: 0,
    dexterity: 2,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  languages: ['common', 'elvish'],
  feats: [
    'resist to sleep',
    'advantage against charm',
    'skill versatility',
    'abilities 2 points remaining',
  ],
};

const HalfElfRace = new Race(HalfElfRaceOptions);
export default HalfElfRace;
