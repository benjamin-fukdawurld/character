import Character from './Character/Character';
import CharacterHandler from './Character/CharacterHandler';
import CharacterAbilities from './Character/CharacterAbilities';
import AbstractCharacterDecorator from './Character/AbstractCharacterDecorator';
import Races from './Character/Races';
import Classes from './Character/Classes';

const character = new Character({
  name: 'test',
  race: Races.elf,
  characterClasses: [Classes.test],
  level: [1],
  experiencePoints: 0,
  ...CharacterAbilities.random({ from: Races.elf.abilities, bestOf: 10 }),
});

class Decorator extends AbstractCharacterDecorator {
  getArmorClass(modifier: number): number {
    return this.target.getArmorClass(modifier) + 2;
  }
}

const characterHandler = new CharacterHandler(character);

characterHandler.addDecorator(new Decorator(character));

console.log('armor class', characterHandler.armorClass);
console.log('armor class', character.getArmorClass(characterHandler.abilities.dexterity.modifier));
