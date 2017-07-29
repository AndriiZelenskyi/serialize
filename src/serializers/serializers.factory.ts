import {Type} from "../type";
import {Serializer} from "./serializer";
import {PrimitiveSerializer} from "./primitive.serializer";

let instance: SerializersFactory;

export class SerializersFactory {
    private serializersMap = new Map<Type<any>, Serializer<any>>();

    // noinspection JSUnusedLocalSymbols
    private constructor() {}

    getSerializer<T>(type: Type<T>): Serializer<T> | undefined {
        return this.serializersMap.get(type);
    }

    registerSerializer<T>(type: Type<T>, serializer: Serializer<T>): void {
        this.serializersMap.set(type, serializer);
    }

    static get instance(): SerializersFactory {
        if(!instance) {
            instance = new SerializersFactory();
            instance.registerSerializer<Number>(Number, <Serializer<Number>>new PrimitiveSerializer());
            instance.registerSerializer<String>(String, <Serializer<String>>new PrimitiveSerializer());
        }
        return instance;
    }
}