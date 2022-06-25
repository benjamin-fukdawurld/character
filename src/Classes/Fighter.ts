import { ClassOptions } from './interfaces';
import Class from './Class';
import { IBaseCharacter } from '../Character';

const FighterClassOptions: ClassOptions = {
  'hit dice': '1d10',
  name: 'fighter',
  feats: [
    'saving throw bonus for strength',
    'saving throw bonus for constitution',
    'proficiency bonus for all armor',
    'proficiency bonus for shields',
    'proficiency bonus for simple weapon',
    'proficiency bonus for martial weapon',
  ],

  levelUp: (value: IBaseCharacter) => value,
};

const FighterClass = new Class(FighterClassOptions);
export default FighterClass;
