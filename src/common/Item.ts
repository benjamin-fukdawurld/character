import { Coins, ItemOptions } from './interfaces';
import { convertCoins } from './coins';

export default abstract class Item {
  public readonly name: string;

  public readonly weight: number;

  public readonly cost: Partial<Coins>;

  public readonly feats: any[];

  public constructor(options: ItemOptions) {
    if (options.weight < 0) {
      throw new Error('Item weight cannot be a negative value');
    }

    if (convertCoins({ value: options.cost, to: 'gold coins' }) < 0) {
      throw new Error('Item cost cannot be a negative value');
    }

    this.name = options.name;
    this.weight = options.weight;
    this.cost = options.cost;
    this.feats = options.feats;
  }
}
