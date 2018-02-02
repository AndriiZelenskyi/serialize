import {Serializer} from "./serializer";

export class PrimitiveSerializer<T extends Number | String> implements Serializer<T>{
    serialize: (model: T) => Object;
    deserialize: (json: Object) => T;

    constructor() {
        this.serialize = model => model || null;
        this.deserialize = json => <T>json || null;
    }
}

