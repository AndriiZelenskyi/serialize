import { Serializer } from "./serializer";
import { Type } from "../type";
export declare class ModelSerializer<T extends Object> implements Serializer<T> {
    private type;
    serialize: (model: T) => Object | null;
    deserialize: (json: Object) => T | null;
    constructor(type: Type<T>);
}
