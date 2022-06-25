import Barbarian from './Barbarian';
import Bard from './Bard';
import Cleric from './Cleric';
import Druid from './Druid';
import Fighter from './Fighter';
import Monk from './Monk';
import Paladin from './Paladin';
import Ranger from './Ranger';
import Rogue from './Rogue';
import Sorcerer from './Sorcerer';
import Warlock from './Warlock';
import Wizard from './Wizard';

export * from './interfaces';
export { default as Class } from './Class';
export { default as ClassesManager } from './ClassesManager';

export {
  Barbarian,
  Bard,
  Cleric,
  Druid,
  Fighter,
  Monk,
  Paladin,
  Ranger,
  Rogue,
  Sorcerer,
  Warlock,
  Wizard,
};

export const defaultClasses = [
  Barbarian,
  Bard,
  Cleric,
  Druid,
  Fighter,
  Monk,
  Paladin,
  Ranger,
  Rogue,
  Sorcerer,
  Warlock,
  Wizard,
];
