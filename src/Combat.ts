import { Dice } from '@benjamin_fdw/dice';
import { CharacterGroup } from './CharacterGroup';

export interface CombatOptions {
  attackingGroups: CharacterGroup[];
  defendingGroups: CharacterGroup[];
  stealth?: boolean;
}

export default class Combat {
  private _attackingGroups: CharacterGroup[];

  private _defendingGroups: CharacterGroup[];

  private _groups: CharacterGroup[];

  private _roundIndex: number;

  private _playingCharacterIndex: number | null;

  private _characterOrder: string[];

  constructor(groups: CharacterGroup[], options?: CombatOptions) {
    this._groups = groups;
    this._roundIndex = -1;
    this._playingCharacterIndex = null;
    this._characterOrder = [];

    this._attackingGroups = options?.attackingGroups || [];
    this._defendingGroups = options?.defendingGroups || [];
  }

  private getCharacterOrders(): string[] {
    const characters: {
      id: string;
      initiative: number;
    }[] = [];

    const dice = new Dice({ count: 1, size: 20 });
    const gen = dice.generator();

    this._groups.forEach((group) => {
      characters.push(
        ...group.characters.map((current) => ({
          id: current.id,
          initiative: gen.next().value.total + current.initiativeBonus,
        })),
      );
    });

    return characters
      .sort((a, b) => b.initiative - a.initiative)
      .map((current): string => current.id);
  }

  public *turnGenerator(): Generator<string, undefined, never> {
    this._characterOrder = this.getCharacterOrders();
    this._playingCharacterIndex = 0;
    this._roundIndex = 0;
    while (this._groups.find((group) => group.canFight) !== undefined) {
      if (this._playingCharacterIndex === null) {
        return;
      }

      yield this._characterOrder[this._playingCharacterIndex!];
      ++this._playingCharacterIndex;
      if (this._playingCharacterIndex >= this._characterOrder.length) {
        ++this._roundIndex;
        this._playingCharacterIndex = 0;
      }
    }
  }
}
