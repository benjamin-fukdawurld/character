import { Abilities, AbilityName, AbilityNames } from '../Abilities';
import { BuilderMiddleWare } from '../Builder';
import { CharacterOptions } from '../Character';
import {
  CharacterHeightRanges,
  Range,
  SizeCategoryName,
} from '../common/interfaces';
import { IRace, RaceOptions } from './interfaces';

export default class Race implements IRace {
  public readonly name: string;

  public readonly 'size label': SizeCategoryName;

  public readonly 'size range': Range;

  public readonly speed: number;

  public readonly 'dark vision': number;

  public readonly 'long rest duration': number;

  public readonly languages: string[];

  public readonly abilities: Abilities;

  public readonly feats: any[];

  constructor(options: RaceOptions) {
    this.name = options.name;
    this['size label'] = options['size label'];
    this['size range'] =
      options['size range'] ?? CharacterHeightRanges[options['size label']];
    this.speed = options.speed ?? 9;
    this['dark vision'] = options['dark vision'] ?? 0;
    this['long rest duration'] = options['long rest duration'] ?? 8;
    this.languages = options.languages;
    this.abilities = options.abilities;
    this.feats = options.feats;
  }

  get build(): BuilderMiddleWare {
    const mw = (options: Partial<CharacterOptions>) => {
      const result = options;

      result.race = this;
      result.speed = this.speed;
      result['dark vision'] = this['dark vision'];
      AbilityNames.forEach((name: AbilityName) => {
        result[name] = this.abilities[name] + (result[name] ?? 0);
      });

      /**
       * setup feats
       */

      return result;
    };

    mw.priority = 0;

    return mw;
  }
}
