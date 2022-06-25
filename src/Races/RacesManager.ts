import { IRace } from './interfaces';

export default class RacesManager {
  private static _instance: RacesManager | null;

  public readonly races: Map<string, IRace>;

  private constructor(races: IRace[]) {
    this.races = new Map<string, IRace>(races.map((race) => [race.name, race]));
  }

  public static instance(classes?: IRace[]): RacesManager {
    if (!RacesManager._instance) {
      return RacesManager.reset(classes);
    }

    return RacesManager._instance;
  }

  public static reset(classes?: IRace[]): RacesManager {
    RacesManager._instance = new RacesManager(classes ?? []);

    return RacesManager._instance;
  }
}
