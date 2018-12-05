import 'reflect-metadata';
import {FieldConfig} from "../field/field.config";
import {FieldMetadata} from "../field/field.metadata";
import {FIELDS_METADATA_KEY} from "../metadata.keys";
import {SerializersFactory} from "../serializers";
import {Serializer} from "../serializers";
import {NoSerializerError} from "../errors";

export function Field(config?: FieldConfig): PropertyDecorator {
    return (target, propertyKey: string | symbol) => {
        const stringifiedKey: string = convertToString(propertyKey)

        const fieldsMetadata = Reflect.getMetadata(FIELDS_METADATA_KEY, target) || [];

        const metadata: FieldMetadata = {
            modelPropertyName: stringifiedKey,
            jsonPropertyName: stringifiedKey,
            serializer: getSerializer(),
            ...config
        };

        Reflect.defineMetadata(FIELDS_METADATA_KEY, [...fieldsMetadata, metadata], target);

        function getSerializer(): Serializer<any> {
            const fieldType = Reflect.getMetadata('design:type', target, propertyKey);

            if (!!config && !!config.serializer) {
                return config.serializer;
            }

            const serializer = SerializersFactory.instance.getSerializer(fieldType);

            if (serializer === undefined) {
                throw new NoSerializerError(stringifiedKey);
            }

            return serializer;
        }
    }
}

function convertToString(input: string | symbol): string{
    if(typeof input === 'symbol') {
        return input.toString();
    }
    return input;
}
