import Race from './Race';
import Class from './Class';
import { AbilityConstraint, AbilityNames } from '../AbilityManager';
import { AlignmentShort } from '../Alignment';

export type CharacterGender = 'M' | 'F' | 'U';

export interface CharacterBluePrint {
  name: string;
  gender: CharacterGender;
  age: number;
  speed: number;
  darkVision: number;

  race: Race;
  classes: Map<Class, number>;

  availableAlignments: Set<AlignmentShort>;

  ability: {
    bonus: Map<AbilityNames, number>;
    constraint: Map<AbilityNames, AbilityConstraint>;
  };

  sizeConstraints: {
    height: {
      min: number;
      max: number;
    };

    weight: {
      min: number;
      max: number;
    };
  };
}
