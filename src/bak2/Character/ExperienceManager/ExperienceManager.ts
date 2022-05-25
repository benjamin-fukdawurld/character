import { Class } from '../Builder';

import { ICharacterClass } from './interfaces';

export default class ExperienceManager {
  private mClasses: Map<Class, number>;

  private mExperiencePoints: number;

  constructor(options: any) {
    this.mClasses = options.classes;
    this.mExperiencePoints = options.experiencePoints ?? 0;
  }

  get classes(): ICharacterClass[] {
    const result: ICharacterClass[] = [];
    this.mClasses.forEach((level, cls) => result.push({ className: cls.name, level }));
    return result;
  }

  get experiencePoints(): number {
    return this.mExperiencePoints;
  }

  set experiencePoints(xp: number) {
    if (xp < 0) {
      throw new Error(`Experience points cannot be a negative number (received: '${xp}')`);
    }

    this.mExperiencePoints = xp;
  }
}
