export interface Proficiency {
  name: string;
  value: number;
}

export interface ProficiencySlot {
  filter?: (proficiency: Proficiency) => boolean;
  value: number;
}
