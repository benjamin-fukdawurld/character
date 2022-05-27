import Character, { CharacterOptions } from '../Character';

export default abstract class AbstractCharacterClass {
  public abstract build(options: CharacterOptions): CharacterOptions;

  public abstract levelUp(character: Character);
}
