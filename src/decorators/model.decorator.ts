import { Serializer, SerializersFactory } from '../serializers';
import { Constructor } from '../type';
import { ModelMetadataSerializer } from '../serializers/model-metadata.serializer';

export function Model(serializer?: Serializer<any>) {
  return (target: Constructor<Object>) => {
    SerializersFactory.instance.registerSerializer(target, serializer || new ModelMetadataSerializer(target));
  };
}
