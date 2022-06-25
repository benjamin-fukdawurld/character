import { ClassOptions } from './interfaces';
import Class from './Class';
import { IBaseCharacter } from '../Character';

const SorcererClassOptions: ClassOptions = {
  'hit dice': '1d6',
  name: 'sorcerer',
  feats: [
    'saving throw bonus for constitution',
    'saving throw bonus for charisma',
    'proficiency bonus for dagger',
    'proficiency bonus for dart',
    'proficiency bonus for sling',
    'proficiency bonus for quarterstaff',
    'proficiency bonus for light crossbow',
  ],

  levelUp: (value: IBaseCharacter) => value,
};

const SorcererClass = new Class(SorcererClassOptions);
export default SorcererClass;
