import { RaceOptions } from './interfaces';

import Race from './Race';

const HalflingRaceOptions: RaceOptions = {
  name: 'halfling',
  'size label': 's',
  'size range': { min: 0.75, max: 1.1 },
  speed: 7.5,
  abilities: {
    strength: 0,
    dexterity: 2,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  languages: ['common', 'halfling'],
  feats: [
    'reroll attack roll if 1',
    'advantage against frightened',
    'can move in bigger creature space',
  ],
};

const HalflingRace = new Race(HalflingRaceOptions);
export default HalflingRace;
