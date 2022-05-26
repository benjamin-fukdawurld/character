import { Dice } from '@benjamin_fdw/dice';
import { Abilities } from '../Abilities';
import { CharacterOptions } from '../Character';

export function AdvantageMiddleWare(dice: string | Dice = '1d20') {
  const d = typeof dice === 'string' ? new Dice(dice) : dice;

  const mw = (value: number) => Math.max(value, d.roll().total);
  mw.priority = 0;

  return mw;
}

export function buildElfMiddleWare() {
  const mw = (options: CharacterOptions) => {
    const result = options;

    result.info.races.push('elf');
    result.info.longRestDuration = 4;
    result.info.size = 'm';

    result.abilities.speed = 9;
    result.abilities['dark vision'] = 18;

    (result.abilities.abilities as Abilities).dexterity += 2;

    result.savingThrows.set('sleep', 30);

    if (!result.savingThrowPipelines.has('charm')) {
      result.savingThrowPipelines.set('charm', []);
    }
    result.savingThrowPipelines.get('charm')!.push(AdvantageMiddleWare());

    return result;
  };

  mw.priority = 0;

  return mw;
}
