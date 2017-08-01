import {Serializer} from "../serializers/serializer";
import {Type} from "../type";
import {ModelSerializer} from "../serializers/model.serializer";
import {SerializersFactory} from "../serializers/serializers.factory";

export function Model(serializer?: Serializer<any>) {
    return (target: Type<any>) => {
        SerializersFactory.instance.registerSerializer(target, serializer || new ModelSerializer(target));
    }
}