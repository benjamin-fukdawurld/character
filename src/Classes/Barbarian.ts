import { CharacterOptions } from '../Character';

export function AbilitySavingThrow(value: number = 1) {
  const mw = (current: number) => current + value;
  mw.priority = 0;

  return mw;
}

export function buildBarbarianMiddleWare(
  level: number,
  experience: number,
  skills: string[],
  equipment: Map<string, any>,
  features: Map<string, any>,
) {
  const mw = (options: CharacterOptions) => {
    const result = options;

    result.info.classes.push({ name: 'barbarian', level });
    result.info.experience = experience;
    result.health['hit dice'] = '1d12';

    result.proficiencies.set('light armors', 1);
    result.proficiencies.set('medium armors', 1);
    result.proficiencies.set('shields', 1);
    result.proficiencies.set('simple weapons', 1);
    result.proficiencies.set('martial weapons', 1);

    if (!result.savingThrowPipelines.has('strength')) {
      result.savingThrowPipelines.set('strength', []);
    }
    result.savingThrowPipelines.get('strength')!.push(AbilitySavingThrow());

    if (!result.savingThrowPipelines.has('constitution')) {
      result.savingThrowPipelines.set('constitution', []);
    }
    result.savingThrowPipelines.get('constitution')!.push(AbilitySavingThrow());

    skills.forEach((skill: string) => result.skills.set(skill, skill));
    equipment.forEach((item, slot) => result.equipment.set(slot, item));
    features.forEach((feature, name) => result.features.set(name, feature));

    return result;
  };

  mw.priority = 1;

  return mw;
}
