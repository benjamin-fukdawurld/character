import {
  Alignment,
  AlignmentLaw,
  AlignmentMoral,
  AlignmentShort,
  AlignmentShorts,
} from './interfaces';

function parseAlignmentShort(str: AlignmentShort): Alignment {
  const getLaw = (short: AlignmentShort): AlignmentLaw | undefined => {
    switch (short[0]) {
      case 'C':
        return 'chaotic';
      case 'L':
        return 'lawful';
      case 'N':
        return 'neutral';

      default:
        return undefined;
    }
  };

  const getMoral = (short: AlignmentShort): AlignmentMoral | undefined => {
    if (short === 'N') {
      return 'neutral';
    }

    switch (short[1]) {
      case 'E':
        return 'evil';
      case 'G':
        return 'good';
      case 'N':
        return 'neutral';

      default:
        return undefined;
    }
  };

  const law = getLaw(str);
  const moral = getMoral(str);

  if (!law || !moral) {
    throw new Error(
      `Pattern '${str}' is not a law short (expected: on of ${JSON.stringify(
        AlignmentShorts,
        null,
        2,
      )})`,
    );
  }

  return { law, moral };
}

export { parseAlignmentShort };
