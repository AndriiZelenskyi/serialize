import {FieldConfig} from "./field.config";

export interface FieldMetadata extends FieldConfig {
    propertyName: string | symbol;
    name: string | symbol;
}