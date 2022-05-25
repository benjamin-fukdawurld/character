import BaseCharacter from '../BaseCharacter';

export default class Race {
  readonly name: string;

  readonly buildCharacter: (char: BaseCharacter) => BaseCharacter;

  public static raceMap = new Map<string, Race>();

  constructor(name: string, buildCharacter: (char: BaseCharacter) => BaseCharacter) {
    this.name = name;
    this.buildCharacter = buildCharacter;
  }
}
