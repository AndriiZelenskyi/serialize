import {Serializer} from "./serializer";
import {Type} from "../type";
import {serialize} from "../converters/serialize";
import {deserialize} from "../converters/deserialize";

export class ModelSerializer<T extends Object> implements Serializer<T> {
    serialize: (model: T) => Object;
    deserialize: (json: Object) => T;

    constructor(private type: Type<T>) {
        this.serialize = serialize;
        this.deserialize = json => deserialize(json, type);
    }
}