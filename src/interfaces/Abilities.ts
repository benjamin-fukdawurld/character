export interface Abilities {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface AbilitySlot {
  filter?: (abilityName: string, abilityValue: number) => boolean;
  value: number;
}
