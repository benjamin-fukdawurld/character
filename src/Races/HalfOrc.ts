import { RaceOptions } from './interfaces';

import Race from './Race';

const HalfOrcRaceOptions: RaceOptions = {
  name: 'half-orc',
  'size label': 'm',
  'size range': { min: 1.55, max: 1.85 },
  speed: 9,
  'dark vision': 18,
  'long rest duration': 4,
  abilities: {
    strength: 2,
    dexterity: 0,
    constitution: 1,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  languages: ['common', 'orc'],
  feats: [
    'proficiency in intimidation',
    'relentless endurance',
    'skill versatility',
    'savage attacks',
  ],
};

const HalfOrcRace = new Race(HalfOrcRaceOptions);
export default HalfOrcRace;
