import { ClassOptions } from './interfaces';
import Class from './Class';
import { IBaseCharacter } from '../Character';

const WizardClassOptions: ClassOptions = {
  'hit dice': '1d6',
  name: 'wizard',
  feats: [
    'saving throw bonus for intelligence',
    'saving throw bonus for wisdom',
    'proficiency bonus for dagger',
    'proficiency bonus for dart',
    'proficiency bonus for sling',
    'proficiency bonus for quarterstaff',
    'proficiency bonus for light crossbow',
  ],

  levelUp: (value: IBaseCharacter) => value,
};

const WizardClass = new Class(WizardClassOptions);
export default WizardClass;
