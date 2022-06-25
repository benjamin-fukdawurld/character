import { ClassOptions } from './interfaces';
import Class from './Class';
import { IBaseCharacter } from '../Character';

const PaladinClassOptions: ClassOptions = {
  'hit dice': '1d10',
  name: 'paladin',
  feats: [
    'saving throw bonus for wisdom',
    'saving throw bonus for charisma',
    'proficiency bonus for all armor',
    'proficiency bonus for shields',
    'proficiency bonus for simple weapon',
    'proficiency bonus for martial weapon',
  ],

  levelUp: (value: IBaseCharacter) => value,
};

const PaladinClass = new Class(PaladinClassOptions);
export default PaladinClass;
