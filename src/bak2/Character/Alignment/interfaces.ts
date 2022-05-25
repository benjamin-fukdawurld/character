export type AlignmentLaw = 'chaotic' | 'neutral' | 'lawful';
export type AlignmentMoral = 'evil' | 'neutral' | 'good';

export type AlignmentShort = 'CE' | 'CN' | 'CG' | 'NE' | 'N' | 'NG' | 'LE' | 'LN' | 'LG';

export interface IAlignment {
  law: AlignmentLaw;
  moral: AlignmentMoral;
}
