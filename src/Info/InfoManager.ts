export interface CharacterInformation {
  name: string;
  races: string[];
  classes: {
    name: string;
    level: number;
  }[];
  experience: number;
  size: string;
  longRestDuration: number;
}
