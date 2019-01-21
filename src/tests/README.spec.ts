import { Field, Name, serialize, deserialize, Model, Type, ArraySerializer, PrimitiveSerializer } from '../';

describe('README.md', () => {
    it('Simple model example should be correct', () => {
        class TestModel {
            @Field()
            @Name("server-id")
            id: number;

            @Field()
            fullName: string;

            ignoredField: any;
        }

        const model = new TestModel();
        model.id = 12;
        model.fullName = "Default full name";
        model.ignoredField = { customName: "test" };

        expect(serialize(model)).toEqual({ 'server-id': 12, 'fullName': 'Default full name' });

        const obj = {
            "server-id": 12,
            fullName: "Default full name",
            "custom-date-name": "2017-08-01T06:09:53.802Z"
        };

        const deserialized = deserialize(obj, TestModel);
        expect(deserialized instanceof TestModel).toBeTruthy();
        expect(deserialized.id).toEqual(12);
        expect(deserialized.fullName).toEqual('Default full name');
        expect(deserialized.ignoredField).toBeUndefined();
    });

    it('Nested models exmple should be correct', () => {
        @Model()
        class NestedModel {
            @Field()
            firstField: number;
            @Field()
            secondField: string;
        }

        class OuterModel {
            @Field()
            id: number;

            @Field()
            nestedModel: NestedModel;
        }

        const obj = {
            id: 12,
            nestedModel: {
                firstField: 24,
                secondField: 'Some awesome string!'
            }
        };

        const outerModel = deserialize(obj, OuterModel);
        expect(outerModel instanceof OuterModel).toBeTruthy();
        expect(outerModel.nestedModel instanceof NestedModel).toBeTruthy();
        expect(outerModel.id).toEqual(12);
        expect(outerModel.nestedModel.firstField).toEqual(24);
        expect(outerModel.nestedModel.secondField).toEqual('Some awesome string!');

        expect(serialize(outerModel)).toEqual({
            id: 12,
            nestedModel: {
                firstField: 24,
                secondField: "Some awesome string!"
            }
        });
    });

    it('Arrays example should be correct', () => {
        class Test {
            @Field()
            id: number;
        
            @Field()
            @Name('numbers')
            @Type(new ArraySerializer(new PrimitiveSerializer()))
            arrayOfNumbers: number[];
        }
        
        const obj = {
            id: 12,
            numbers: [12, 24, 36, 48]
        };
        
        const deserializedModel = deserialize(obj, Test);
        expect(deserializedModel instanceof Test).toBeTruthy();
        expect(deserializedModel.id).toEqual(12);
        expect(Array.isArray(deserializedModel.arrayOfNumbers)).toBeTruthy();
        expect(deserializedModel.arrayOfNumbers).toEqual([12, 24, 36, 48]);
    });
})