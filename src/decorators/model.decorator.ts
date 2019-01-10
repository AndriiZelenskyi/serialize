import { ModelSerializer, Serializer, SerializersFactory } from '../serializers';
import { Constructor } from '../type';

export function Model(serializer?: Serializer<any>) {
  return (target: Constructor<any>) => {
    SerializersFactory.instance.registerSerializer(target, serializer || new ModelSerializer(target));
  };
}
