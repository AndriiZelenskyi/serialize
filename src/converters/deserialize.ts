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
export function deserialize<T extends Object>(
  json: Object,
  constructor: Constructor<T>
): T {
  if (SerializersFactory.instance.isSerializerPresent(constructor)) {
    const serializer = SerializersFactory.instance.getSerializer(constructor);
    if (serializer === undefined) {
      throw new Error('Couldn\'t find a serializer for a type ' + constructor.name);
    }
    return <T>serializer.deserialize(json);
  } else {
    SerializersFactory.instance.registerSerializer(constructor, new ModelMetadataSerializer(constructor));
    return deserialize(json, constructor);
  }
}
