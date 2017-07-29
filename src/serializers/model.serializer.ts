import {Serializer} from "./serializer";
import {Type} from "../type";
import {serialize} from "../converters/serialize";
import {deserialize} from "../converters/deserialize";

export class ModelSerializer<T extends Object> implements Serializer<T> {
    serialize: (model: T) => Object | null;
    deserialize: (json: Object) => T | null;

    constructor(private type: Type<T>) {
        this.serialize = model => model ? serialize(model) : null;
        this.deserialize = json => json ? deserialize(json, type) : null;
    }
}