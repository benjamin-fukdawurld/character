import { WeaponOptions } from './interfaces';

const defaultWeapons: WeaponOptions[] = [
  {
    type: 'melee weapon',
    category: 'simple weapon',
    name: 'quarterstaff',
    cost: { 'silver coins': 2 },
    weight: 2,
    feats: [],
    'grip style': 'versatile',
    damages: {
      'single handed': {
        bludgeoning: '1d6',
      },
      'two handed': {
        bludgeoning: '1d8',
      },
    },
  },
  {
    type: 'melee weapon',
    category: 'simple weapon',
    name: 'dagger',
    cost: { 'gold coins': 2 },
    weight: 0.5,
    feats: ['light', 'finesse'],
    range: {
      min: 6,
      max: 18,
    },
    throwable: true,
    damages: {
      'single handed': { piercing: '1d4' },
    },
  },
  {
    type: 'melee weapon',
    category: 'simple weapon',
    name: 'club',
    cost: { 'silver coins': 1 },
    weight: 1,
    feats: ['light'],
    damages: {
      'single handed': { bludgeoning: '1d4' },
    },
  },
  {
    type: 'melee weapon',
    category: 'simple weapon',
    name: 'great club',
    cost: { 'silver coins': 2 },
    weight: 5,
    feats: [],
    'grip style': 'two handed',
    damages: {
      'two handed': { bludgeoning: '1d8' },
    },
  },
  {
    type: 'melee weapon',
    category: 'simple weapon',
    name: 'handaxe',
    cost: { 'gold coins': 5 },
    weight: 1,
    feats: ['light'],
    range: {
      min: 6,
      max: 18,
    },
    throwable: true,
    damages: {
      'single handed': { slashing: '1d6' },
    },
  },
  {
    type: 'melee weapon',
    category: 'simple weapon',
    name: 'javelin',
    cost: { 'silver coins': 5 },
    weight: 1,
    feats: [],
    range: {
      min: 9,
      max: 36,
    },
    throwable: true,
    damages: {
      'single handed': { piercing: '1d6' },
    },
  },
  {
    type: 'melee weapon',
    category: 'simple weapon',
    name: 'light hammer',
    cost: { 'gold coins': 2 },
    weight: 1,
    feats: ['light'],
    range: {
      min: 6,
      max: 18,
    },
    throwable: true,
    damages: {
      'single handed': { bludgeoning: '1d4' },
    },
  },
  {
    type: 'melee weapon',
    category: 'simple weapon',
    name: 'mace',
    cost: { 'gold coins': 5 },
    damages: {
      'single handed': { bludgeoning: '1d6' },
    },
    weight: 2,
    feats: [],
  },
  {
    type: 'melee weapon',
    category: 'simple weapon',
    name: 'sickle',
    cost: { 'gold coins': 1 },
    damages: {
      'single handed': { slashing: '1d4' },
    },
    weight: 1,
    feats: ['light'],
  },
  {
    type: 'melee weapon',
    category: 'simple weapon',
    name: 'spear',
    cost: { 'gold coins': 1 },
    damages: {
      'single handed': { piercing: '1d6' },
      'two handed': { piercing: '1d8' },
    },
    weight: 1.5,
    feats: [],
    range: {
      min: 6,
      max: 18,
    },
    throwable: true,
    'grip style': 'versatile',
  },
  {
    type: 'ranged weapon',
    category: 'simple weapon',
    name: 'light crossbow',
    cost: { 'gold coins': 25 },
    damages: {
      'two handed': { piercing: '1d8' },
    },
    weight: 2.5,
    feats: ['loading'],
    ammunition: true,
    range: {
      min: 24,
      max: 96,
    },
    'grip style': 'two handed',
  },
  {
    type: 'ranged weapon',
    category: 'simple weapon',
    name: 'dart',
    cost: { 'copper coins': 5 },
    damages: {
      'single handed': { piercing: '1d4' },
    },
    weight: 0.125,
    feats: ['finesse'],
    range: {
      min: 6,
      max: 18,
    },
    throwable: true,
  },
  {
    type: 'ranged weapon',
    category: 'simple weapon',
    name: 'short bow',
    cost: { 'gold coins': 25 },
    damages: {
      'two handed': { piercing: '1d6' },
    },
    weight: 1,
    feats: [],
    ammunition: true,
    range: {
      min: 24,
      max: 96,
    },
    'grip style': 'two handed',
  },
  {
    type: 'ranged weapon',
    category: 'simple weapon',
    name: 'sling',
    cost: { 'silver coins': 1 },
    damages: {
      'single handed': { bludgeoning: '1d4' },
    },
    weight: 0.125,
    feats: [],
    ammunition: true,
    range: {
      min: 9,
      max: 36,
    },
  },
];

export { defaultWeapons };
