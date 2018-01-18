import {Field} from "../decorators";
import {deserialize, serialize} from "../converters";

class TestModel {
    @Field()
    id: number;

    @Field({name: 'inputBodyName'})
    body: string;
}

describe('Primitive serializers tests', function () {
    describe('With default name', () => {
        const tJSON = {
            id: 12,
            inputBodyName: null
        };
        const test = new TestModel();
        test.id = 12;

        it('should serialize field', () => {
            const serializedJSON = serialize(test);
            expect(serializedJSON).toEqual(tJSON);
        });

        it('should deserialize field', () => {
            const deserializedModel = deserialize(tJSON, TestModel);
            expect(deserializedModel instanceof TestModel).toBeTruthy();
            expect(deserializedModel.id).toEqual(test.id);
        })
    });

    describe('With custom name', () => {
        const tJSON = {
            id: null,
            inputBodyName: 'Test boby txt'
        };
        const tModel = new TestModel();
        tModel.body = 'Test boby txt';

        it('should serialize field', () => {
            const serializedJSON = serialize(tModel);
            expect(serializedJSON).toEqual(tJSON);
        });

        it('should deserialize field', () => {
            const deserializedModel = deserialize(tJSON, TestModel);
            expect(deserializedModel instanceof TestModel).toBeTruthy();
            expect(deserializedModel.body).toEqual(tModel.body);
        });
    });

    describe('Full primitive model', () => {
        const tJSON = {
            id: 12,
            inputBodyName: 'Test body text'
        };
        const tModel = new TestModel();
        tModel.id = 12;
        tModel.body = 'Test body text';

        it('should serialize', () => {
            const serializedJSON = serialize(tModel);
            expect(serializedJSON).toEqual(tJSON);
        });

        it('should deserialize', () => {
            const deserializedModel = deserialize(tJSON, TestModel);
            expect(deserializedModel instanceof TestModel).toBeTruthy();
            expect(deserializedModel).toEqual(tModel);
        });
    });
});
