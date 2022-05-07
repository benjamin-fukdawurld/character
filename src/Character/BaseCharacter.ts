import { DiceSet } from 'fdw-dice';

import { Race, Class } from './Builder';
import { AlignmentShort } from './Alignment';

import HealthManager from './HealthManager';
import ExperienceManager from './ExperienceManager';

interface BaseCharacterOptions {
  name: string;
  race: Race;
  alignment: AlignmentShort;
  experienceMgr: ExperienceManager;
  healthMgr: HealthManager;
}

export default abstract class BaseCharacter {
  readonly name: string;

  readonly race: Race;

  private mExperienceMgr: ExperienceManager;

  public mHealthMgr: HealthManager;

  constructor(options: BaseCharacterOptions) {
    this.name = options.name;
    this.race = options.race;
    this.mExperienceMgr = options.experienceMgr;
    this.mHealthMgr = options.healthMgr;
  }

  get healthManager(): HealthManager {
    return this.mHealthMgr;
  }

  get experienceManager(): ExperienceManager {
    return this.mExperienceMgr;
  }
}
