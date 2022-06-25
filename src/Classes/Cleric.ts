import { ClassOptions } from './interfaces';
import Class from './Class';
import { IBaseCharacter } from '../Character';

const ClericClassOptions: ClassOptions = {
  'hit dice': '1d8',
  name: 'cleric',
  feats: [
    'saving throw bonus for wisdom',
    'saving throw bonus for charisma',
    'proficiency bonus for shields',
    'proficiency bonus for light armor',
    'proficiency bonus for medium armor',
    'proficiency bonus for simple weapon',
    'pick 2 cleric skills',
  ],

  levelUp: (value: IBaseCharacter) => value,
};

const ClericClass = new Class(ClericClassOptions);
export default ClericClass;
