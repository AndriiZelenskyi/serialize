import { Serializer } from './serializer';

export class ArraySerializer<T extends Object> implements Serializer<Array<T>> {
  serialize: (model: Array<T>) => Object | null;
  deserialize: (json: Object) => Array<T> | null;

  constructor(serializer: Serializer<T>) {
    this.serialize = model => model.map(serializer.serialize);
    this.deserialize = json => json ? (json as Array<Object>).map(serializer.deserialize) as Array<T> : null;
  }
}
