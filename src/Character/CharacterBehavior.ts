import { ICharacter, CharacterEventNames } from './interfaces';

export type CharacterEvent<
  P = void,
  N = CharacterEventNames,
  CharacterType extends ICharacter = ICharacter,
> = {
  name: N;
  target: CharacterType;
  payload: P;
};

type EventHandlerFunction<
  P = void,
  N = CharacterEventNames,
  CharacterType extends ICharacter = ICharacter,
> = (event: CharacterEvent<P, N, CharacterType>) => void;

// PayloadCharacterEvent<T, CharacterType>

interface IEventHandler {
  name: CharacterEventNames;
  handler: EventHandlerFunction<any>;
}

function onSurprised(event: CharacterEvent<{ attacker: ICharacter }>) {
  console.log(`${event.target.id} surprised by ${event.payload.attacker.id}!`);
}

function onAttacked(event: CharacterEvent<{ attacker: ICharacter }>) {
  console.log(`${event.target.id} attacked by ${event.payload.attacker.id}!`);
}

const defaultHandlers: IEventHandler[] = [
  { name: 'surprised', handler: onSurprised },
  { name: 'attacked', handler: onAttacked },
];

export default class CharacterBehavior {
  readonly character: ICharacter;

  constructor(
    character: ICharacter,
    handlers: IEventHandler[] = defaultHandlers,
  ) {
    this.character = character;

    handlers.forEach(({ name, handler }) => {
      this.character.on(name, handler, this.character);
    });
  }

  attack(target: ICharacter) {
    console.log(target);
    target.emit('attacked', {
      name: 'attacked',
      target,
      payload: { attacker: this.character },
    });
  }
}
