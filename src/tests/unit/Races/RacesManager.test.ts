import { describe, it, expect } from '@jest/globals';

import { RacesManager, defaultRaces } from '../../../Races';

describe('RacesManager is a singleton class that gathers the D&D 5 character races', () => {
  describe('RacesManager must be constructible form an array of Races', () => {
    const RacesMgr = RacesManager.instance(defaultRaces);
    it('must contain the expected races', () => {
      expect(
        [...RacesMgr.races].map(([_, value]) => value.name).sort(),
      ).toEqual(defaultRaces.map((current) => current.name).sort());
    });

    it('it must always return the same instance', () => {
      expect(RacesManager.instance()).toBe(RacesMgr);
    });

    it('must be resettable', () => {
      expect(RacesManager.reset().races.size).toBe(0);
    });
  });
});
