import { Serializer } from "./serializer";
export declare class ArraySerializer<T extends Object> implements Serializer<Array<T>> {
    serialize: (model: Array<T>) => Object | null;
    deserialize: (json: Object) => Array<T> | null;
    constructor(serializer: Serializer<T>);
}
