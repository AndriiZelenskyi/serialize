import 'reflect-metadata';
import {FieldConfig} from "../field.config";
import {FieldMetadata} from "../field.metadata";
import {FIELDS_METADATA_KEY} from "../metadata.keys";

export function SerializableField(config?: FieldConfig): PropertyDecorator {
    return (target, propertyKey) => {
        const fieldsMetadata = Reflect.getMetadata(FIELDS_METADATA_KEY, target) || [];

        const metadata: FieldMetadata = {
            name: propertyKey,
            propertyName: propertyKey,
            ...config
        };

        Reflect.defineMetadata(FIELDS_METADATA_KEY, [...fieldsMetadata, metadata], target);
    }
}