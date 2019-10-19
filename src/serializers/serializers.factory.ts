import { Constructor } from '../type';
import { Serializer } from './serializer';
import { PrimitiveSerializer } from './primitive.serializer';
import { DateSerializer } from './date.serializer';

let instance: SerializersFactory;

export class SerializersFactory {
  private serializersMap = new Map<Constructor<any>, Serializer<any>>();

  // noinspection JSUnusedLocalSymbols
  private constructor() {}

  static get instance(): SerializersFactory {
    if (!instance) {
      instance = new SerializersFactory();
      instance.registerSerializer<Number>(Number, new PrimitiveSerializer<Number>());
      instance.registerSerializer<String>(String, new PrimitiveSerializer<String>());
      instance.registerSerializer<Boolean>(Boolean, new PrimitiveSerializer<Boolean>());
      instance.registerSerializer<Date>(Date, new DateSerializer<Date>());
    }
    return instance;
  }

  getSerializer<T>(type: Constructor<T>): Serializer<T> | undefined {
    return this.serializersMap.get(type);
  }

  registerSerializer<T>(type: Constructor<T>, serializer: Serializer<T>): void {
    if (!this.serializersMap.has(type)) {
      this.serializersMap.set(type, serializer);
    }
  }

  isSerializerPresent<T>(type: Constructor<T>): boolean {
    return this.serializersMap.has(type);
  }
}
