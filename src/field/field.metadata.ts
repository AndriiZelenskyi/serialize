import {FieldConfig} from "./field.config";
import {Serializer} from "../serializers/serializer";

export interface FieldMetadata extends FieldConfig {
    propertyName: string | symbol;
    name: string | symbol;
    serializer: Serializer<any>;
}