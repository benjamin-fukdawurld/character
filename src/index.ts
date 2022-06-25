import { parseAlignmentShort } from './Info';

parseAlignmentShort('LG');

/*
import {
  buildAbilityMiddleware,
  buildHealthMiddleware,
  defaultCharacterOptions,
} from './common/build-utils';

import { BuilderPipeline } from './Builder';
import Character from './Character/Character';

import { CharacterOptions } from './Character';

import { RacesManager, defaultRaces } from './Races';
import { ClassesManager, defaultClasses } from './Classes';

const racesManager = RacesManager.instance(defaultRaces);
const classesManager = ClassesManager.instance(defaultClasses);

const barbarianElfBuilder = new BuilderPipeline();

barbarianElfBuilder.use(
  racesManager.races.get('elf')!.build,
  classesManager.classes.get('barbarian')!.build,
  buildAbilityMiddleware({
    abilities: {
      strength: 15,
      dexterity: 12,
      constitution: 18,
      intelligence: 10,
      wisdom: 3,
      charisma: 9,
    },
  }),
  buildHealthMiddleware({}),
);

const char1Options = Object.assign(defaultCharacterOptions, {
  name: 'character 1',
  age: 21,
  gender: 'male',
  size: 1.75,
  weight: 80,
  alignment: 'N',
}) as Partial<CharacterOptions>;

const char2Options = Object.assign(defaultCharacterOptions, {
  name: 'character 2',
  age: 21,
  gender: 'male',
  size: 1.75,
  weight: 80,
  alignment: 'N',
}) as Partial<CharacterOptions>;

const char1 = new Character(
  barbarianElfBuilder.get(char1Options) as CharacterOptions,
);
const char2 = new Character(
  barbarianElfBuilder.get(char2Options) as CharacterOptions,
);
*/

/*
const behavior1 = new CharacterBehavior(char1);
const _ = new CharacterBehavior(char2);

behavior1.attack(char2);
*/

/*
buildBarbarianMiddleWare(
    1,
    0,
    ['athletics', 'intimidation'],
    new Map<string, any>([
      [
        'weapon 1',
        {
          name: 'great axe',
        },
      ],
      [
        'weapon 2',
        {
          name: 'hand axes',
          quantity: 2,
        },
      ],
      [
        'weapon 3',
        {
          name: 'javelins',
          quantity: 4,
        },
      ],
    ]),
    new Map<string, any>([
      ['Rage', 'Rage'],
      ['unarmored defense', 'unarmored defense'],
    ]),
  ),
  */
