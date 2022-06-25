import { describe, it, expect } from '@jest/globals';

import { ClassesManager, defaultClasses } from '../../../Classes';

describe('ClassesManager is a singleton class that gathers the D&D 5 character classes', () => {
  describe('ClassesManager must be constructible form an array of Classes', () => {
    const ClassesMgr = ClassesManager.instance(defaultClasses);
    it('must contain the expected classes', () => {
      expect(
        [...ClassesMgr.classes].map(([_, value]) => value.name).sort(),
      ).toEqual(defaultClasses.map((current) => current.name).sort());
    });

    it('it must always return the same instance', () => {
      expect(ClassesManager.instance()).toBe(ClassesMgr);
    });

    it('must be resettable', () => {
      expect(ClassesManager.reset().classes.size).toBe(0);
    });
  });
});
