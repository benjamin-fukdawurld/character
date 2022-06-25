import { describe, it, expect } from '@jest/globals';
import { BuilderPipeline } from '../../Builder';
import {
  buildAbilityMiddleware,
  buildHealthMiddleware,
  defaultCharacterOptions,
} from '../../common/build-utils';
import Character, { CharacterOptions } from '../../Character';

describe('A Character represents a D&D 5 Character', () => {
  it('must be creatable using a CharacterOptions object describing the character', () => {
    //const barbarianElfBuilder = new BuilderPipeline();

    throw new Error('not implemented yet');

    /*
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
    char1Options.name = 'character 1';

    const char = new Character(
      barbarianElfBuilder.get(char1Options) as CharacterOptions,
    );
    expect(char.getAttribute('strength')).toBe(15);
    */
  });
});
