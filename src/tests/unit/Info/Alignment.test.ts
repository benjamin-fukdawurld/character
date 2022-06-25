import { describe, it, expect } from '@jest/globals';
import { parseAlignmentShort } from '../../../Info';

describe('parseAlignmentShort turns an AlignmentShort into an Alignment object', () => {
  it('parseAlignmentShort returns an alignment', () => {
    expect(parseAlignmentShort('LG')).toEqual({
      law: 'lawful',
      moral: 'good',
    });
    expect(parseAlignmentShort('LN')).toEqual({
      law: 'lawful',
      moral: 'neutral',
    });
    expect(parseAlignmentShort('LE')).toEqual({
      law: 'lawful',
      moral: 'evil',
    });
    expect(parseAlignmentShort('NG')).toEqual({
      law: 'neutral',
      moral: 'good',
    });
    expect(parseAlignmentShort('N')).toEqual({
      law: 'neutral',
      moral: 'neutral',
    });
    expect(parseAlignmentShort('NE')).toEqual({
      law: 'neutral',
      moral: 'evil',
    });
    expect(parseAlignmentShort('CG')).toEqual({
      law: 'chaotic',
      moral: 'good',
    });
    expect(parseAlignmentShort('CN')).toEqual({
      law: 'chaotic',
      moral: 'neutral',
    });
    expect(parseAlignmentShort('CE')).toEqual({
      law: 'chaotic',
      moral: 'evil',
    });

    expect(() => parseAlignmentShort('not a short')).toThrow();
  });
});
