import { MiddleWare, Pipeline } from '@benjamin_fdw/core';
import { CharacterOptions } from './Character';

export type BuilderMiddleWare<Env = void> = MiddleWare<
  Partial<CharacterOptions>,
  Env
>;

export class BuilderPipeline<Env = void> extends Pipeline<
  Partial<CharacterOptions>,
  Env
> {}
