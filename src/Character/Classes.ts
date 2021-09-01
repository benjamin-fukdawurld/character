import { Dice } from 'fdw-dice';

const test = {
  name: 'test',
  healthDice: new Dice('1d12'),
  proficiencies: [],
  savingThrows: [],
  skills: [],

  eventHandlers: [],
};

const allClasses = [test];

export default { test, allClasses };
