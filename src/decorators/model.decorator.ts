import {Serializer} from "../serializers";
import {Type} from "../type";
import {ModelSerializer} from "../serializers";
import {SerializersFactory} from "../serializers";

export function Model(serializer?: Serializer<any>) {
    return (target: Type<any>) => {
        SerializersFactory.instance.registerSerializer(target, serializer || new ModelSerializer(target));
    }
}