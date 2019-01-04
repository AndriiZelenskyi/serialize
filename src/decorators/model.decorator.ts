import {Serializer} from "../serializers";
import {Constructor} from "../type";
import {ModelSerializer} from "../serializers";
import {SerializersFactory} from "../serializers";

export function Model(serializer?: Serializer<any>) {
    return (target: Constructor<any>) => {
        SerializersFactory.instance.registerSerializer(target, serializer || new ModelSerializer(target));
    }
}