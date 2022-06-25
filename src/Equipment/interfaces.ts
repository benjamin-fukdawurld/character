import { ItemOptions } from '../common/interfaces';

export interface ArmorPieceOptions extends ItemOptions {
  'armor class bonus': number;
}

export const ArmorSlotNames = [
  'helmet',
  'armor',
  'gauntlets',
  'shield',
  'boots',
];
export type ArmorSlotsTuple = typeof ArmorSlotNames;
export type ArmorSlot = ArmorSlotsTuple[number];
export type ArmorSlots<T = any> = {
  [K in ArmorSlot]: T;
};

export const MiscSlotNames = [
  'amulet',
  'left ring',
  'right ring',
  'belt',
  'cloak',
];
export type MiscSlotsTuple = typeof MiscSlotNames;
export type MiscSlot = MiscSlotsTuple[number];
export type MiscSlots<T = any> = {
  [K in MiscSlot]: T;
};
