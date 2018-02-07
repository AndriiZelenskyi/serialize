import {Field} from "../decorators";
import {ArraySerializer, ModelSerializer} from "../serializers";
import {PrimitiveSerializer} from "../serializers/primitive.serializer";
import {deserialize, serialize} from "../converters";

class TestConfiguration {
    @Field({serializer: new ArraySerializer(new PrimitiveSerializer())})
    fields?: Array<string>;
}

class TestModel {
    @Field({serializer: new ModelSerializer(TestConfiguration)})
    configuration?: TestConfiguration;

    static getFull(fields: string[]): TestModel {
        const model = new TestModel();
        const configuration = new TestConfiguration();
        configuration.fields = fields;
        model.configuration = configuration;
        return model;
    }
}

describe('Optional model fields', () => {
    describe('Full model', () => {

        const fullJSON = {
            configuration: {
                fields: ['a', 'b', 'c']
            }
        };
        const fullModel = TestModel.getFull(['a', 'b', 'c']);

        it('should serialize', () => {
            const serializedJSON = serialize(fullModel);
            expect(serializedJSON).toEqual(fullJSON);
        });

        it('should deserialize', () => {
            const deserializedModel = deserialize(fullJSON, TestModel);
            expect(deserializedModel).toEqual(fullModel);
        })
    })
});
