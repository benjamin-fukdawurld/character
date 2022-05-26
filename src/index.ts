import { Dice } from '@benjamin_fdw/dice';
import {
  buildAbilityMiddleware,
  BuilderPipeline,
  buildHealthMiddleware,
  defaultCharacterOptions,
} from './Builder';
import Character from './Character/Character';
import CharacterBehavior from './Character/CharacterBehavior';

import { buildElfMiddleWare } from './Races/Elf';
import { buildBarbarianMiddleWare } from './Classes/Barbarian';

const barbarianElfBuilder = new BuilderPipeline();

barbarianElfBuilder.use(
  buildElfMiddleWare(),
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

const char1Options = defaultCharacterOptions();
char1Options.info.name = 'character 1';

const char2Options = defaultCharacterOptions();
char1Options.info.name = 'character 2';

const char1 = new Character(barbarianElfBuilder.get(char1Options));
const char2 = new Character(barbarianElfBuilder.get(char2Options));

const behavior1 = new CharacterBehavior(char1);
const _ = new CharacterBehavior(char2);

behavior1.attack(char2);
console.log(char2.getAttribute<Dice>('hit dice'));
