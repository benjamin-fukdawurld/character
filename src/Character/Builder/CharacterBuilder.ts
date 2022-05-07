import BaseCharacter from '../BaseCharacter';

export type CharacterBuildStep = (char: BaseCharacter) => BaseCharacter;

export interface ICharacterBuilderOptions {
  raceBuildStep: CharacterBuildStep;
  classBuildStep: CharacterBuildStep;
}

export default class CharacterBuilder {
  constructor(private options: ICharacterBuilderOptions) {}

  build(char: BaseCharacter): BaseCharacter {
    return this.options.classBuildStep(this.options.raceBuildStep(char));
  }
}
