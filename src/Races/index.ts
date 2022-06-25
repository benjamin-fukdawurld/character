import Dragonborn from './Dragonborn';
import Dwarf from './Dwarf';
import Elf from './Elf';
import Gnome from './Gnome';
import HalfElf from './HalfElf';
import Halfling from './Halfling';
import HalfOrc from './HalfOrc';
import Human from './Human';
import Tiefling from './Tiefling';

export * from './interfaces';

export { default as Race } from './Race';
export { default as RacesManager } from './RacesManager';

export {
  Dragonborn,
  Dwarf,
  Elf,
  Gnome,
  HalfElf,
  HalfOrc,
  Halfling,
  Human,
  Tiefling,
};

export const defaultRaces = [
  Dragonborn,
  Dwarf,
  Elf,
  Gnome,
  HalfElf,
  HalfOrc,
  Halfling,
  Human,
  Tiefling,
];
