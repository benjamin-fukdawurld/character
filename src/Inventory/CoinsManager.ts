import { CoinName, Coins, convertCoins } from '../common';

export default class CoinsManager {
  private _wealth: number;

  public constructor(coins: Coins) {
    this._wealth = convertCoins({
      value: coins,
      to: 'gold coins',
    });
  }

  public get coins(): Coins {
    return {
      'platinum coins': this['platinum coins'],
      'gold coins': this['gold coins'] % 10,
      'electrum coins': 0,
      'silver coins': this['silver coins'] % 10,
      'copper coins': this['copper coins'] % 10,
    };
  }

  public set coins(value: Partial<Coins>) {
    this._wealth = convertCoins({
      value,
      to: 'gold coins',
    });

    if (this._wealth < 0) {
      throw new Error('Coins value cannot be a negative number');
    }
  }

  public has(value: number, currency: CoinName): boolean {
    return this[currency] >= value;
  }

  public add({
    value,
    currency,
  }: {
    value: number | Partial<Coins>;
    currency: CoinName;
  }): void {
    this.coins = {
      'gold coins':
        this._wealth +
        convertCoins({
          value,
          from: currency,
          to: 'gold coins',
        }),
    };
  }

  public remove({
    value,
    currency,
  }: {
    value: number | Partial<Coins>;
    currency: CoinName;
  }): void {
    this.coins = {
      'gold coins':
        this._wealth -
        convertCoins({
          value,
          from: currency,
          to: 'gold coins',
        }),
    };
  }

  public get 'copper coins'(): number {
    return Math.trunc(
      convertCoins({
        value: this._wealth,
        from: 'gold coins',
        to: 'copper coins',
      }),
    );
  }

  public get 'silver coins'(): number {
    return Math.trunc(
      convertCoins({
        value: this._wealth,
        from: 'gold coins',
        to: 'silver coins',
      }),
    );
  }

  public get 'electrum coins'(): number {
    return Math.trunc(
      convertCoins({
        value: this._wealth,
        from: 'gold coins',
        to: 'electrum coins',
      }),
    );
  }

  public get 'gold coins'(): number {
    return Math.trunc(this._wealth);
  }

  public get 'platinum coins'(): number {
    return Math.trunc(
      convertCoins({
        value: this._wealth,
        from: 'gold coins',
        to: 'platinum coins',
      }),
    );
  }
}
