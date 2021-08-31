import { Dice, DiceRoll } from 'fdw-dice';

function getBestScore(roll: DiceRoll): number {
  roll.diceValues.sort();
  roll.diceValues.shift();
  return roll.diceValues.reduce((total: number, current: number): number => total + current, 0);
}

function* attributeGenerator(count: number = 1): Generator<number[], never, number> {
  const dice = new Dice('4d6');
  while (true) {
    yield [...Array(count)].map((val: any) => getBestScore(dice.roll()));
  }
}

const gen = attributeGenerator(6);

console.log(gen.next().value);
