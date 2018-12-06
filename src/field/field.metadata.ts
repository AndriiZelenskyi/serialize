import {FieldConfig} from "./field.config";
import {Serializer} from "../serializers";
import { Type } from "../type";

export interface FieldMetadata extends FieldConfig {
    /**
     * Name of property in Model
     */
    modelPropertyName: string;
    /**
     * JSON jsonPropertyName
     */
    jsonPropertyName: string;
    serializer: Serializer<any>;
}

export function getMetadata<T>(type: Type<T>): FieldMetadata[] {
    const target = new type();
    const properties: string[] = Object.getOwnPropertyNames(target);
    // Reflect.getMetadata()
    return [];
}
