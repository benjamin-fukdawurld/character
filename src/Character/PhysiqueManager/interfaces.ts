export interface IPhysiqueTransformer {
  getArmorClass?: (armorClass: number) => number;
  getInitiative?: (initiative: number) => number;
  getSpeed?: (speed: number) => number;
  getProficiencyBonus?: (bonus: number) => number;
}
