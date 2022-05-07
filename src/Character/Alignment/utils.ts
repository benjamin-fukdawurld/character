import { AlignmentLaw, AlignmentMoral, AlignmentShort, IAlignment } from './interfaces';

export function parseAlignmentShort(str: AlignmentShort): IAlignment {
  if (str.length === 1) {
    if (str === 'N') {
      return { law: 'neutral', moral: 'neutral' };
    }

    throw new Error(`Pattern '${str}' is not a valid alignment short string`);
  }

  let law: AlignmentLaw | undefined;
  let moral: AlignmentMoral | undefined;

  switch (str[0]) {
    case 'C':
      law = 'chaotic';
      break;

    case 'N':
      law = 'neutral';
      break;

    case 'L':
      law = 'lawful';
      break;

    default:
      throw new Error(`Pattern '${str}' as no law alignment`);
  }

  switch (str[1]) {
    case 'E':
      moral = 'evil';
      break;

    case 'N':
      moral = 'neutral';
      break;

    case 'G':
      moral = 'good';
      break;

    default:
      throw new Error(`Pattern '${str}' as no law alignment`);
  }

  return { law, moral };
}

export default { parseAlignmentShort };
