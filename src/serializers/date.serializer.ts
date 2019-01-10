import { Serializer } from './serializer';

export class DateSerializer<T extends Date> implements Serializer<T> {
  serialize: (model: T) => Object;
  deserialize: (json: Object) => T;


  /**
   * If initializer does not set - use default new Date
   * @param {(json: Object) => T} initializer
   */
  constructor(initializer?: (json: Object) => T) {
    this.serialize = model => model.toISOString();
    this.deserialize = json => (initializer
      ? initializer(json) : (new Date(<string>json) as T))
      || null;
  }
}
