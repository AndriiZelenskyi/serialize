import 'reflect-metadata';
import {FieldConfig} from "../field/field.config";
import {FieldMetadata} from "../field/field.metadata";
import {FIELDS_METADATA_KEY} from "../metadata.keys";
import {SerializersFactory} from "../serializers";
import {Serializer} from "../serializers";
import {NoSerializerError} from "../errors";

export function Field(config?: FieldConfig): PropertyDecorator {
    return (target, propertyKey) => {
        const fieldsMetadata = Reflect.getMetadata(FIELDS_METADATA_KEY, target) || [];

        const metadata: FieldMetadata = {
            propertyName: propertyKey,
            name: propertyKey,
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
                console.log(fieldType);
                throw new NoSerializerError(propertyKey);
            }

            return serializer;
        }
    }
}
