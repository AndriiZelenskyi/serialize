import { Serializer } from './serializer';

export class ArraySerializer<T extends Object> implements Serializer<Array<T>> {
  serialize: (model: Array<T>) => Object | null;
  deserialize: (json: Object) => Array<T> | null;

  constructor(serializer: Serializer<T>) {
    this.serialize = model => model.map(v => serializer.serialize(v));
    this.deserialize = json => (json ? ((json as Array<Object>).map(v => serializer.deserialize(v)) as Array<T>) : null);
  }
}
