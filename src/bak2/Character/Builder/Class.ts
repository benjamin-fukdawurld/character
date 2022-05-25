import BaseCharacter from '../BaseCharacter';

export default abstract class Class {
  readonly name: string;

  readonly buildCharacter: (char: BaseCharacter) => BaseCharacter;

  public static classMap = new Map<string, Class>();

  constructor(name: string, buildCharacter: (char: BaseCharacter) => BaseCharacter) {
    this.name = name;
    this.buildCharacter = buildCharacter;
  }
}
