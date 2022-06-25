import { RaceOptions } from './interfaces';

import Race from './Race';

const TieflingRaceOptions: RaceOptions = {
  name: 'tiefling',
  'size label': 'm',
  'size range': { min: 1.55, max: 1.85 },
  speed: 9,
  'dark vision': 18,
  abilities: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 1,
    wisdom: 0,
    charisma: 2,
  },
  languages: ['common', 'infernal'],
  feats: ['hellish resistance', 'infernal legacy'],
};

const TieflingRace = new Race(TieflingRaceOptions);
export default TieflingRace;
