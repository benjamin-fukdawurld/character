import { ClassOptions } from './interfaces';
import Class from './Class';
import { IBaseCharacter } from '../Character';

const BarbarianClassOptions: ClassOptions = {
  'hit dice': '1d12',
  name: 'barbarian',
  feats: [
    'saving throw bonus for strength',
    'saving throw bonus for constitution',
    'proficiency bonus for shields',
    'proficiency bonus for light armor',
    'proficiency bonus for medium armor',
    'proficiency bonus for simple weapon',
    'proficiency bonus for martial weapon',
    'choose to skills for barbarian',
  ],

  levelUp: (value: IBaseCharacter) => value,
};

const BarbarianClass = new Class(BarbarianClassOptions);
export default BarbarianClass;
