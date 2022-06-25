export const CoinNames = [
  'copper coins',
  'silver coins',
  'electrum coins',
  'gold coins',
  'platinum coins',
] as const;

export type CoinNamesTuple = typeof CoinNames;
export type CoinName = CoinNamesTuple[number];
export type Coins = {
  [K in CoinName]: number;
};
