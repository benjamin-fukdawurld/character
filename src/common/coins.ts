import { CoinName, CoinNames, Coins } from './interfaces';

export const changeRates: Coins = {
  'copper coins': 1 / 100,
  'silver coins': 1 / 10,
  'electrum coins': 1 / 2,
  'gold coins': 1,
  'platinum coins': 10,
} as const;

export const numberOfDecimals: Coins = {
  'copper coins': 0,
  'silver coins': 1,
  'electrum coins': 2,
  'gold coins': 2,
  'platinum coins': 3,
} as const;

export function convertCoins({
  value,
  ...currency
}: {
  value: number | Partial<Coins>;
  from?: CoinName;
  to: CoinName;
}): number {
  if (typeof value === 'number') {
    if (!currency.from) {
      throw new Error('Cannot convert value without input currency');
    }

    const factor = 10 ** numberOfDecimals[currency.to];
    return (
      Math.round(
        ((value * changeRates[currency.from]) / changeRates[currency.to]) *
          factor,
      ) / factor
    );
  }

  return CoinNames.reduce((total, coin: CoinName) => {
    let result = total;
    if (value[coin]) {
      result += convertCoins({
        value: value[coin]!,
        from: coin,
        to: currency.to,
      });
    }

    return result;
  }, 0);
}
