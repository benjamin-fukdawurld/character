import { ClassOptions } from './interfaces';
import Class from './Class';
import { IBaseCharacter } from '../Character';

const RogueClassOptions: ClassOptions = {
  'hit dice': '1d8',
  name: 'rogue',
  feats: [
    'saving throw bonus for dexterity',
    'saving throw bonus for intelligence',
    'proficiency bonus for light armor',
    'proficiency bonus for simple weapon',
    'proficiency bonus for hand crossbow',
    'proficiency bonus for long sword',
    'proficiency bonus for rapier',
    'proficiency bonus for short sword',
  ],

  levelUp: (value: IBaseCharacter) => value,
};

const RogueClass = new Class(RogueClassOptions);
export default RogueClass;
