import { ClassOptions } from './interfaces';
import Class from './Class';
import { IBaseCharacter } from '../Character';

const DruidClassOptions: ClassOptions = {
  'hit dice': '1d8',
  name: 'druid',
  feats: [
    'saving throw bonus for intelligence',
    'saving throw bonus for wisdom',
    'proficiency bonus for light armor (non metal)',
    'proficiency bonus for medium armor (non metal)',
    'proficiency bonus for shields (non metal)',
    'proficiency bonus for druid weapons',
    'herbalism kit',
    'choose 2 druid skills',
  ],

  levelUp: (value: IBaseCharacter) => value,
};

const DruidClass = new Class(DruidClassOptions);
export default DruidClass;
