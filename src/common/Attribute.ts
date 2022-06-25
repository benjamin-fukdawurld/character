import { Pipeline } from '@benjamin_fdw/core';

export default class Attribute<T, Env = any> {
  private _value: T;

  private _pipeline: Pipeline<T, Env>;

  constructor(value: T, pipeline: Pipeline<T, Env> = new Pipeline<T, Env>()) {
    this._value = value;
    this._pipeline = pipeline;
  }

  public get pipeline(): Pipeline<T, Env> {
    return this._pipeline;
  }

  public get rawValue(): T {
    return this._value;
  }

  public set rawValue(value: T) {
    this._value = value;
  }

  public get value(): T {
    return this._pipeline.get(this._value);
  }
}
