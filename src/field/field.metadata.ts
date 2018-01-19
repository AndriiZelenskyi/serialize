import {FieldConfig} from "./field.config";
import {Serializer} from "../serializers";

export interface FieldMetadata extends FieldConfig {
    /**
     * Name of property in Model
     */
    modelPropertyName: string | symbol;
    /**
     * JSON jsonPropertyName
     */
    jsonPropertyName: string | symbol;
    serializer: Serializer<any>;
}