import { ArmorOptions } from './interfaces';

const defaultArmors: ArmorOptions[] = [
  {
    type: 'light armor',
    name: 'padded armor',
    'armor class bonus': 1,
    'use dexterity bonus': true,
    'stealth disadvantage': true,
    weight: 4,
    cost: {
      'gold coins': 5,
    },
    feats: [],
  },

  {
    type: 'light armor',
    name: 'leather armor',
    'armor class bonus': 1,
    'use dexterity bonus': true,
    weight: 5,
    cost: {
      'gold coins': 10,
    },
    feats: [],
  },

  {
    type: 'light armor',
    name: 'studded leather armor',
    'armor class bonus': 2,
    'use dexterity bonus': true,
    weight: 6.5,
    cost: {
      'gold coins': 45,
    },
    feats: [],
  },

  {
    type: 'medium armor',
    name: 'hide armor',
    'armor class bonus': 2,
    'use dexterity bonus': true,
    'max dexterity bonus': 2,
    weight: 6,
    cost: {
      'gold coins': 10,
    },
    feats: [],
  },

  {
    type: 'medium armor',
    name: 'chain shirt armor',
    'armor class bonus': 3,
    'use dexterity bonus': true,
    'max dexterity bonus': 2,
    weight: 10,
    cost: {
      'gold coins': 50,
    },
    feats: [],
  },

  {
    type: 'medium armor',
    name: 'scale mail armor',
    'armor class bonus': 4,
    'use dexterity bonus': true,
    'max dexterity bonus': 2,
    'stealth disadvantage': true,
    weight: 22.5,
    cost: {
      'gold coins': 50,
    },
    feats: [],
  },

  {
    type: 'medium armor',
    name: 'breastplate armor',
    'armor class bonus': 4,
    'use dexterity bonus': true,
    'max dexterity bonus': 2,
    weight: 10,
    cost: {
      'gold coins': 400,
    },
    feats: [],
  },

  {
    type: 'medium armor',
    name: 'half plate armor',
    'armor class bonus': 5,
    'use dexterity bonus': true,
    'max dexterity bonus': 2,
    'stealth disadvantage': true,
    weight: 20,
    cost: {
      'gold coins': 750,
    },
    feats: [],
  },

  {
    type: 'heavy armor',
    name: 'ring mail armor',
    'armor class bonus': 4,
    'use dexterity bonus': false,
    'stealth disadvantage': true,
    weight: 20,
    cost: {
      'gold coins': 30,
    },
    feats: [],
  },

  {
    type: 'heavy armor',
    name: 'chain mail armor',
    'armor class bonus': 6,
    'use dexterity bonus': false,
    'stealth disadvantage': true,
    'required strength': 13,
    weight: 27.5,
    cost: {
      'gold coins': 75,
    },
    feats: [],
  },

  {
    type: 'heavy armor',
    name: 'splint armor',
    'armor class bonus': 7,
    'use dexterity bonus': false,
    'stealth disadvantage': true,
    'required strength': 15,
    weight: 30,
    cost: {
      'gold coins': 200,
    },
    feats: [],
  },

  {
    type: 'heavy armor',
    name: 'plate armor',
    'armor class bonus': 8,
    'use dexterity bonus': false,
    'stealth disadvantage': true,
    'required strength': 15,
    weight: 32.5,
    cost: {
      'gold coins': 1500,
    },
    feats: [],
  },
];

export { defaultArmors };
