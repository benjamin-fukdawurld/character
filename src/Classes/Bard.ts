import { ClassOptions } from './interfaces';
import Class from './Class';
import { IBaseCharacter } from '../Character';

const BardClassOptions: ClassOptions = {
  'hit dice': '1d8',
  name: 'bard',
  feats: [
    'saving throw bonus for dexterity',
    'saving throw bonus for charisma',
    'proficiency bonus for light armor',
    'proficiency bonus for simple weapon',
    'proficiency bonus for hand crossbow',
    'proficiency bonus for long sword',
    'proficiency bonus for rapier',
    'proficiency bonus for short sword',
    'choose any three',
    'three musical instruments',
  ],

  levelUp: (value: IBaseCharacter) => value,
};

const BardClass = new Class(BardClassOptions);
export default BardClass;
