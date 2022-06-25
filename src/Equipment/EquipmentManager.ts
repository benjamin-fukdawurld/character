import { Dice } from '@benjamin_fdw/dice';

import { ArmorSlot, ArmorSlotNames, ArmorSlots } from './interfaces';
import ArmorPiece from './ArmorPiece';
import { Coins } from '../Inventory';

export const WeaponTypeNames = ['melee weapon', 'ranged weapon'] as const;
export type WeaponTypeNamesTuple = typeof WeaponTypeNames;
export type WeaponTypeName = WeaponTypeNamesTuple[number];

export const WeaponCategoryNames = ['simple weapon', 'martial weapon'] as const;
export type WeaponCategoryNamesTuple = typeof WeaponCategoryNames;
export type WeaponCategoryName = WeaponCategoryNamesTuple[number];

export interface Weapon {
  name: string;
  type: WeaponTypeName;
  category: WeaponCategoryName;
  damage: string | Dice;
  weight: number;
  cost: Partial<Coins>;
}

export interface Projectile {
  name: string;
  type: string;
  quantity: number;
}

export default class EquipmentManager {
  private _armorSet: Map<ArmorSlot, ArmorPiece>;

  constructor(options: { 'armor set': ArmorSlots<ArmorPiece> }) {
    this._armorSet = new Map<ArmorSlot, ArmorPiece>();
    ArmorSlotNames.forEach((slot: ArmorSlot) => {
      this._armorSet.set(slot, options['armor set'][slot]);
    });
  }
}
