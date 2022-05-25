export type CharacterGender = 'M' | 'F' | 'U';

export interface AppearanceOptions {
  gender: CharacterGender;
  height?: number;
  weight?: number;
  eyesColor?: string;
  skinColor?: string;
  hairColor?: string;
}

export interface AppearanceTransformer {
  getGender?: (gender: CharacterGender) => CharacterGender;
  getHeight?: (height: number) => number;
  getWeight?: (weight: number) => number;
  getEyesColor?: (color: string) => string;
  getSkinColor?: (color: string) => string;
  getHairColor?: (color: string) => string;
}

export const CHARACTER_MIN_HEIGHT: number = 0.15;
export const CHARACTER_MAX_HEIGHT: number = 15;

export const CHARACTER_MIN_WEIGHT: number = 0.1;
export const CHARACTER_MAX_WEIGHT: number = 1000;

export default class AppearanceManager {
  readonly mGender: CharacterGender;

  private mHeight: number;

  private mWeight: number;

  private mEyesColor: string;

  private mSkinColor: string;

  private mHairColor: string;

  private mTransformers: Set<AppearanceTransformer>;

  constructor(options: AppearanceOptions) {
    this.mGender = options.gender;
    this.mHeight = options.height ?? 1.6;
    this.mWeight = options.weight ?? (options.gender === 'F' ? 60 : 70);
    this.mEyesColor = options.eyesColor ?? 'black/white';
    this.mSkinColor = options.skinColor ?? '#E2B681';
    this.mHairColor = options.hairColor ?? 'black';

    this.mTransformers = new Set<AppearanceTransformer>();
  }

  get gender(): CharacterGender {
    let result = this.mGender;
    this.mTransformers.forEach((transformer) => {
      if (transformer.getGender) {
        result = transformer.getGender(result);
      }
    });

    return result;
  }

  get height(): number {
    let result = this.mHeight;
    this.mTransformers.forEach((transformer) => {
      if (transformer.getHeight) {
        result = transformer.getHeight(result);
      }
    });

    return result;
  }

  set height(value: number) {
    if (value < CHARACTER_MIN_HEIGHT || value > CHARACTER_MAX_HEIGHT) {
      throw new Error(`Height must be in range [${CHARACTER_MIN_HEIGHT}, ${CHARACTER_MAX_HEIGHT}]`);
    }

    this.mHeight = value;
  }

  get weight(): number {
    let result = this.mWeight;
    this.mTransformers.forEach((transformer) => {
      if (transformer.getWeight) {
        result = transformer.getWeight(result);
      }
    });

    return result;
  }

  set weight(value: number) {
    if (value < CHARACTER_MIN_WEIGHT || value > CHARACTER_MAX_WEIGHT) {
      throw new Error(`Weight must be in range [${CHARACTER_MIN_WEIGHT}, ${CHARACTER_MAX_WEIGHT}]`);
    }

    this.mWeight = value;
  }

  get eyesColor(): string {
    let result = this.mEyesColor;
    this.mTransformers.forEach((transformer) => {
      if (transformer.getEyesColor) {
        result = transformer.getEyesColor(result);
      }
    });

    return result;
  }

  get skinColor(): string {
    let result = this.mSkinColor;
    this.mTransformers.forEach((transformer) => {
      if (transformer.getSkinColor) {
        result = transformer.getSkinColor(result);
      }
    });

    return result;
  }

  get hairColor(): string {
    let result = this.mHairColor;
    this.mTransformers.forEach((transformer) => {
      if (transformer.getHairColor) {
        result = transformer.getHairColor(result);
      }
    });

    return result;
  }

  get transformers(): AppearanceTransformer[] {
    return [...this.mTransformers];
  }

  addTransformer(mod: AppearanceTransformer) {
    this.mTransformers.add(mod);
  }

  removeTransformer(mod: AppearanceTransformer) {
    this.mTransformers.delete(mod);
  }
}
