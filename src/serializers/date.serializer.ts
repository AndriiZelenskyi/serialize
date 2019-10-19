import { Serializer } from './serializer';

export class DateSerializer<T extends Date> implements Serializer<T> {
  serialize: (model: T) => Object;
  deserialize: (json: Object) => T;

  /**
   * @param initializer Function for creating date from json, {@link Date} by default
   */
  constructor(initializer?: (json: Object) => T) {
    this.serialize = model => model.toISOString();
    this.deserialize = json => (initializer ? initializer(json) : (new Date(<string>json) as T)) || null;
  }
}
