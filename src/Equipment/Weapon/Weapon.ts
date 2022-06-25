import { MiddleWare } from '@benjamin_fdw/core';
import { Dice } from '@benjamin_fdw/dice';
import {
  WeaponCategoryName,
  WeaponDamages,
  WeaponGripDamages,
  WeaponGripName,
  WeaponGripNames,
  WeaponOptions,
  WeaponRange,
  WeaponTypeName,
  WeaponWeightCategoryName,
} from './interfaces';
import Item from '../../common/Item';
import {
  Damages,
  DamageTypeName,
  DamageTypeNames,
} from '../../common/interfaces';

export default class Weapon extends Item {
  public readonly type: WeaponTypeName;

  public readonly category: WeaponCategoryName;

  public readonly 'weight category': WeaponWeightCategoryName;

  public readonly 'grip style': WeaponGripName;

  public readonly throwable: boolean;

  public readonly ammunition: boolean;

  public readonly damages: WeaponDamages<Dice | number>;

  public readonly range: WeaponRange | null;

  constructor(options: WeaponOptions) {
    super(options);
    this.type = options.type;
    this.category = options.category;
    this['weight category'] = options['weight category'] ?? 'regular';
    this['grip style'] = options['grip style'] ?? 'single handed';
    this.range = options.range ?? null;
    this.throwable = options.throwable ?? false;
    this.ammunition = options.ammunition ?? false;

    this.damages = Weapon._extractDamages(options.damages);
  }

  get middleware(): MiddleWare<Partial<Damages<number>>> {
    return (value: Partial<Damages<number>>) => {
      const result: Partial<Damages<number>> = {};
      DamageTypeNames.forEach((current: DamageTypeName) => {
        const dmg =
          this.damages['single handed']![current] instanceof Dice
            ? (this.damages['single handed']![current] as Dice).roll().total
            : (this.damages['single handed']![current] as number | undefined);

        result[current] = (value[current] ?? 0) + (dmg ?? 0);
      });

      return result;
    };
  }

  private static _extractGripDamages(
    damages: WeaponGripDamages,
  ): WeaponGripDamages<Dice | number> {
    return Object.fromEntries(
      DamageTypeNames.map((type: DamageTypeName) => {
        const value =
          typeof damages[type] === 'string'
            ? new Dice(damages[type] as string)
            : damages[type];

        return [type, value];
      }),
    ) as WeaponGripDamages<Dice | number>;
  }

  private static _extractDamages(
    damages: WeaponDamages,
  ): WeaponDamages<Dice | number> {
    return Object.fromEntries(
      WeaponGripNames.map(
        (grip: WeaponGripName): [string, WeaponGripDamages | undefined] => [
          grip,
          damages[grip]
            ? Weapon._extractGripDamages(damages[grip]!)
            : undefined,
        ],
      ),
    ) as WeaponDamages<Dice | number>;
  }
}
