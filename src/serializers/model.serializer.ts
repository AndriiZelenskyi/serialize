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

  serialize(modelForSerialization: T, additionalInfo: any): Object | null {
    return this.metadataSerializer.serialize(modelForSerialization, additionalInfo);
  }

  deserialize(json: Object, additionalInfo: any): T | null {
    return this.metadataSerializer.deserialize(json, additionalInfo);
  }
}

export function model<T>(constructor: Constructor<T>): ModelMetadataSerializer<T> {
  return new ModelMetadataSerializer<T>(constructor);
}
