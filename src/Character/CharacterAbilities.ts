import EventEmitter from 'events';
import { DiceRoll, DiceSetRoll, DiceSet } from 'fdw-dice';

import { Abilities } from '../interfaces/Abilities';
import Ability from './Ability';

export default class CharacterAbilities extends EventEmitter {
  private mStrength: Ability;

  private mDexterity: Ability;

  private mConstitution: Ability;

  private mIntelligence: Ability;

  private mWisdom: Ability;

  private mCharisma: Ability;

  constructor(abilities: Abilities) {
    super();

    this.mStrength = new Ability(abilities.strength);
    this.mDexterity = new Ability(abilities.dexterity);
    this.mConstitution = new Ability(abilities.constitution);
    this.mIntelligence = new Ability(abilities.intelligence);
    this.mWisdom = new Ability(abilities.wisdom);
    this.mCharisma = new Ability(abilities.charisma);
  }

  public get strength(): Ability {
    return this.mStrength;
  }

  public alterStrength({ value, duration }: { value: number; duration?: number }): void {
    const modifier = this.strength.modifier;
    this.strength.value += value;
    if (duration) {
      setTimeout(() => {
        this.alterStrength({ value: -value });
      }, duration);
    }

    if (modifier !== this.strength.modifier) {
      this.emit('strength-modifier-changed', this, { value, duration });
    }
  }

  public get dexterity(): Ability {
    return this.mDexterity;
  }

  public alterDexterity({ value, duration }: { value: number; duration?: number }): void {
    const modifier = this.dexterity.modifier;
    this.dexterity.value += value;
    if (duration) {
      setTimeout(() => {
        this.alterDexterity({ value: -value });
      }, duration);
    }

    if (modifier !== this.dexterity.modifier) {
      this.emit('dexterity-modifier-changed', this, { value, duration });
    }
  }

  public get constitution(): Ability {
    return this.mConstitution;
  }

  public alterConstitution({ value, duration }: { value: number; duration?: number }): void {
    const modifier = this.constitution.modifier;
    this.constitution.value += value;
    if (duration) {
      setTimeout(() => {
        this.alterConstitution({ value: -value });
      }, duration);
    }

    if (modifier !== this.constitution.modifier) {
      this.emit('constitution-modifier-changed', this, { value, duration });
    }
  }

  public get intelligence(): Ability {
    return this.mIntelligence;
  }

  public alterIntelligence({ value, duration }: { value: number; duration?: number }): void {
    const modifier = this.intelligence.modifier;
    this.intelligence.value += value;
    if (duration) {
      setTimeout(() => {
        this.alterIntelligence({ value: -value });
      }, duration);
    }

    if (modifier !== this.intelligence.modifier) {
      this.emit('intelligence-modifier-changed', this, { value, duration });
    }
  }

  public get wisdom(): Ability {
    return this.mWisdom;
  }

  public alterWisdom({ value, duration }: { value: number; duration?: number }): void {
    const modifier = this.wisdom.modifier;
    this.wisdom.value += value;
    if (duration) {
      setTimeout(() => {
        this.alterWisdom({ value: -value });
      }, duration);
    }

    if (modifier !== this.wisdom.modifier) {
      this.emit('wisdom-modifier-changed', this, { value, duration });
    }
  }

  public get charisma(): Ability {
    return this.mCharisma;
  }

  public alterCharisma({ value, duration }: { value: number; duration?: number }): void {
    const modifier = this.charisma.modifier;
    this.charisma.value += value;
    if (duration) {
      setTimeout(() => {
        this.alterCharisma({ value: -value });
      }, duration);
    }

    if (modifier !== this.charisma.modifier) {
      this.emit('charisma-modifier-changed', this, { value, duration });
    }
  }

  static random({ from, bestOf }: { from?: Abilities; bestOf?: number }): Abilities {
    const getBestRoll = (roll: DiceRoll): number => {
      roll.diceValues.sort();
      roll.diceValues.shift();
      return roll.diceValues.reduce((total: number, current: number): number => total + current, 0);
    };

    const abilitiesDices = new DiceSet('4d6 4d6 4d6 4d6 4d6 4d6');
    let bestScore: DiceSetRoll | undefined;
    let i = 0;
    do {
      const currentScore = abilitiesDices.roll();
      if (!bestScore || bestScore.total < currentScore.total) {
        bestScore = currentScore;
      }
      ++i;
    } while (!!bestOf && i < bestOf);

    let strength = getBestRoll(bestScore.diceRolls[0]);
    if (from?.strength) {
      strength += from.strength;
    }

    let dexterity = getBestRoll(bestScore.diceRolls[1]);
    if (from?.dexterity) {
      dexterity += from.dexterity;
    }

    let constitution = getBestRoll(bestScore.diceRolls[2]);
    if (from?.constitution) {
      constitution += from.constitution;
    }

    let intelligence = getBestRoll(bestScore.diceRolls[3]);
    if (from?.intelligence) {
      intelligence += from.intelligence;
    }

    let wisdom = getBestRoll(bestScore.diceRolls[4]);
    if (from?.wisdom) {
      wisdom += from.wisdom;
    }

    let charisma = getBestRoll(bestScore.diceRolls[5]);
    if (from?.charisma) {
      charisma += from.charisma;
    }

    return { strength, dexterity, constitution, intelligence, wisdom, charisma };
  }
}
