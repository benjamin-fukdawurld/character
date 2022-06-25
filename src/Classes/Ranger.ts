import { ClassOptions } from './interfaces';
import Class from './Class';
import { IBaseCharacter } from '../Character';

const RangerClassOptions: ClassOptions = {
  'hit dice': '1d10',
  name: 'ranger',
  feats: [
    'saving throw bonus for strength',
    'saving throw bonus for dexterity',
    'proficiency bonus for light armor',
    'proficiency bonus for medium armor',
    'proficiency bonus for shields',
    'proficiency bonus for simple weapon',
    'proficiency bonus for martial weapon',
  ],

  levelUp: (value: IBaseCharacter) => value,
};

const RangerClass = new Class(RangerClassOptions);
export default RangerClass;
