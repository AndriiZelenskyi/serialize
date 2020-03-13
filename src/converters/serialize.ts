import 'reflect-metadata';
import { SerializersFactory } from '../serializers';
import { ModelMetadataSerializer } from '../serializers/model-metadata.serializer';

/**
 * Convert model to json with metadata names
 *
 * Fields that not are labeled as {@link Field} will be ignore
 *
 * @param model Serializable model that was convert to json
 * @returns Server object
 */
export function serialize<T>(model: T): {[property: string]: any};
export function serialize<T, I>(model: T, additionalInfo: I): {[property: string]: any};
export function serialize<T, I>(model: T, additionalInfo?: I): {[property: string]: any} {
  const modelPrototype = Object.getPrototypeOf(model);
  const constructor = modelPrototype.constructor;
  if (SerializersFactory.instance.isSerializerPresent(constructor)) {
    const serializer = SerializersFactory.instance.getSerializer(constructor);
    if (serializer === undefined) {
      throw new Error("Couldn't find serializer for a type " + constructor.name);
    }
    return serializer.serialize(model, additionalInfo) || {};
  } else {
    SerializersFactory.instance.registerSerializer(constructor, new ModelMetadataSerializer(constructor));
    return serialize(model, additionalInfo);
  }
}
