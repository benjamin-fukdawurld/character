import { Pipeline } from '@benjamin_fdw/core';

import Attribute from './Attribute';

export default class AttributeProxy<T, S = T, Env = any> {
  private _attr: Attribute<T, Env>;

  private _proxy: (value: Attribute<T, Env>) => S;

  private _pipeline: Pipeline<S, Env>;

  constructor(
    attr: Attribute<T>,
    proxy: (value: Attribute<T, Env>) => S,
    pipeline: Pipeline<S, Env> = new Pipeline<S, Env>(),
  ) {
    this._attr = attr;
    this._proxy = proxy;
    this._pipeline = pipeline;
  }

  public get pipeline(): Pipeline<S, Env> {
    return this._pipeline;
  }

  public get attribute(): Attribute<T, Env> {
    return this._attr;
  }

  public get proxy(): (value: Attribute<T, Env>) => S {
    return this._proxy;
  }

  public get value(): S {
    return this._pipeline.get(this._proxy(this._attr));
  }
}
