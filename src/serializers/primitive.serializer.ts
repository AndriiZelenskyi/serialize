import {Serializer} from "./serializer";

export class PrimitiveSerializer implements Serializer<Primitive>{
    serialize: (model: Primitive) => Object;
    deserialize: (json: Object) => Primitive;

    constructor() {
        this.serialize = model => model;
        this.deserialize = json => json as Primitive;
    }
}

export type Primitive = string | symbol | number;
