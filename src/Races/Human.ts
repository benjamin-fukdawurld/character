import { RaceOptions } from './interfaces';

import Race from './Race';

const HumanRaceOptions: RaceOptions = {
  name: 'human',
  'size label': 'm',
  'size range': { min: 1.55, max: 1.85 },
  speed: 9,
  abilities: {
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
  },
  languages: ['common'],
  feats: ['pick a language'],
};

const HumanRace = new Race(HumanRaceOptions);
export default HumanRace;
