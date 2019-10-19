import { Constructor } from '../type';
import { SerializersFactory } from '../serializers';
import { ModelMetadataSerializer } from '../serializers/model-metadata.serializer';

/**
 * Convert json for type that you need with updated names
 *
 * @param json A plain JSON object that represents your model from server.
 * @param constructor A model constructor for creation of object.
 * @returns A deserialized model as an instance of your class.
 */
export function deserialize<T extends Object>(json: Object, constructor: Constructor<T>): T;
export function deserialize<T extends Object>(json: Object, constructor: Constructor<T>, additionalInfo?: any): T;
export function deserialize<T extends Object>(constructor: Constructor<T>): (json: Object) => T;
export function deserialize<T extends Object>(
  jsonOrConstructor: Object | Constructor<T>,
  constructor?: Constructor<T>,
  additionalInfo?: any
): ((json: Object) => T) | T {
  if (typeof jsonOrConstructor === 'function') {
    return (json: Object) => deserialize(json, <Constructor<T>>(<any>jsonOrConstructor));
  }
  if (constructor === undefined) {
    throw new Error('Please provide a constructor');
  }
  if (SerializersFactory.instance.isSerializerPresent(constructor)) {
    const serializer = SerializersFactory.instance.getSerializer(constructor);
    if (serializer === undefined) {
      throw new Error("Couldn't find a serializer for a type " + constructor.name);
    }
    return <T>serializer.deserialize(jsonOrConstructor, additionalInfo);
  } else {
    SerializersFactory.instance.registerSerializer(constructor, new ModelMetadataSerializer(constructor));
    return deserialize(jsonOrConstructor, constructor, additionalInfo);
  }
}
