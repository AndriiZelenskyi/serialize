import {Type} from "../type";
import {Serializer} from "./serializer";
import {PrimitiveSerializer} from "./primitive.serializer";
import {DateSerializer} from "./date.serializer";

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
            instance.registerSerializer<Number>(Number, new PrimitiveSerializer<Number>());
            instance.registerSerializer<String>(String, new PrimitiveSerializer<String>());
            instance.registerSerializer<Boolean>(Boolean, new PrimitiveSerializer<Boolean>());
            instance.registerSerializer<Date>(Date, new DateSerializer<Date>());
        }
        return instance;
    }
}