import { RaceOptions } from './interfaces';

import Race from './Race';

const GnomeRaceOptions: RaceOptions = {
  name: 'gnome',
  'size label': 's',
  'size range': { min: 0.9, max: 1.2 },
  speed: 7.5,
  'dark vision': 18,
  abilities: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 2,
    wisdom: 0,
    charisma: 0,
  },
  languages: ['common', 'gnomish'],
  feats: ['gnome cunning'],
};

const GnomeRace = new Race(GnomeRaceOptions);
export default GnomeRace;
