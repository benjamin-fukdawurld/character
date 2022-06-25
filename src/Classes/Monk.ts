import { ClassOptions } from './interfaces';
import Class from './Class';
import { IBaseCharacter } from '../Character';

const BarbarianClassOptions: ClassOptions = {
  'hit dice': '1d8',
  name: 'monk',
  feats: [
    'saving throw bonus for dexterity',
    'saving throw bonus for wisdom',
    'proficiency bonus for simple weapon',
    'proficiency bonus for short sword',
  ],

  levelUp: (value: IBaseCharacter) => value,
};

const BarbarianClass = new Class(BarbarianClassOptions);
export default BarbarianClass;
