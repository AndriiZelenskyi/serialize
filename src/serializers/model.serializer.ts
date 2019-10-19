import { Serializer } from './serializer';
import { Constructor } from '../type';
import { ModelMetadataSerializer } from './model-metadata.serializer';

/**
 * @deprecated Use {@link ModelMetadataSerializer} instead this one
 */
export class ModelSerializer<T extends Object> implements Serializer<T> {
  private metadataSerializer: ModelMetadataSerializer<T>;

  constructor(constructor: Constructor<T>) {
    this.metadataSerializer = new ModelMetadataSerializer<T>(constructor);
  }

  serialize(model: T): Object | null {
    return this.metadataSerializer.serialize(model);
  }

  deserialize(json: Object): T | null {
    return this.metadataSerializer.deserialize(json);
  }
}
