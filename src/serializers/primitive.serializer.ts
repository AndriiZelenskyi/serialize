import { Serializer } from './serializer';
import { ifPresentGet } from './field.utils';

export class PrimitiveSerializer<T extends Number | String | Boolean> implements Serializer<T> {
  serialize: (model: T) => Object | null;
  deserialize: (json: Object) => T | null;

  constructor() {
    this.serialize = model => ifPresentGet(model, <any>undefined)(model);
    this.deserialize = json => ifPresentGet(<T>json, <any>undefined)(json);
  }
}

