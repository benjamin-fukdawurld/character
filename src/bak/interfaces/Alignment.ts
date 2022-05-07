export type AlignmentLaw = 'chaotic' | 'neutral' | 'lawful';
export type AlignmentMoral = 'evil' | 'neutral' | 'good';

export type AlignmentShort = 'CE' | 'CN' | 'CG' | 'NE' | 'N' | 'NG' | 'LE' | 'LN' | 'LG';

export interface Alignment {
  law: AlignmentLaw;
  moral: AlignmentMoral;
}

export function parseAlignmentShort(str: AlignmentShort): Alignment {
  if (str.length === 1) {
    return { law: 'neutral', moral: 'neutral' };
  }

  let law: AlignmentLaw | undefined;
  let moral: AlignmentMoral | undefined;

  if (str[0] === 'C') {
    law = 'chaotic';
  } else if (str[0] === 'N') {
    law = 'neutral';
  } else if (str[0] === 'L') {
    law = 'lawful';
  }

  if (!law) {
    throw new Error(`Patter '${str}' as no law alignment`);
  }

  if (str[1] === 'E') {
    moral = 'evil';
  } else if (str[1] === 'N') {
    moral = 'neutral';
  } else if (str[1] === 'G') {
    moral = 'good';
  }

  if (!moral) {
    throw new Error(`Patter '${str}' as no moral alignment`);
  }

  return { law, moral };
}
