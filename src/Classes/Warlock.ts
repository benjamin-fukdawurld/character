import { ClassOptions } from './interfaces';
import Class from './Class';
import { IBaseCharacter } from '../Character';

const WarlockClassOptions: ClassOptions = {
  'hit dice': '1d8',
  name: 'warlock',
  feats: [
    'saving throw bonus for wisdom',
    'saving throw bonus for charisma',
    'proficiency bonus for light armor',
    'proficiency bonus for simple weapon',
  ],

  levelUp: (value: IBaseCharacter) => value,
};

const WarlockClass = new Class(WarlockClassOptions);
export default WarlockClass;
