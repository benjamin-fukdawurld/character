export type CharacterEventNames = 'combat engaged' | 'surprised' | 'attacked';

export interface ICharacter {
  readonly id: string;
  initiativeBonus: number;
  readonly isAlive: boolean;
  // on: <T = any>() => Promise<T>;
}

export interface PlayingCharacter {
  groupIndex: number;
  characterIndex: number;
  ICharacter: string;
}

export class CharacterGroup {
  public characters: ICharacter[];

  constructor(characters: ICharacter[] = []) {
    this.characters = characters;
  }

  get canFight() {
    return !!this.characters.find((character) => character.isAlive);
  }

  get(prop: string): ICharacter | undefined {
    return this.characters.find((char) => char.id === prop);
  }
}
