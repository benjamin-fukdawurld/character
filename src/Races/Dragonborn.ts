import { RaceOptions } from './interfaces';

import Race from './Race';

const DragonbornRaceOptions: RaceOptions = {
  name: 'dragonborn',
  'size label': 'm',
  'size range': { min: 1.75, max: 2.2 },
  speed: 9,
  abilities: {
    strength: 2,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 1,
  },
  languages: ['common', 'draconic'],
  feats: ['draconic ancestry', 'breath weapon', 'damage resistance'],
};

const DragonbornRace = new Race(DragonbornRaceOptions);
export default DragonbornRace;
