import {Field} from "../decorators";
import {ArraySerializer, ModelSerializer} from "../serializers";
import {PrimitiveSerializer} from "../serializers/primitive.serializer";
import {deserialize, serialize} from "../converters";

describe('Array serialization and deserialization', () => {
    describe('Primitive array', () => {
        class TestModel {
            @Field({serializer: new ArraySerializer(new PrimitiveSerializer<Number>())})
            primitives: Number[];
        }

        const tJSON = {
            primitives: [1, 2, 3, 4, 5, 6, 7]
        };
        const tModel = new TestModel();
        tModel.primitives = [1, 2, 3, 4, 5, 6, 7];

        it('should deserialize with correct model type', () => {
            const deserializedModel = deserialize(tJSON, TestModel);
            expect(deserializedModel instanceof TestModel).toBeTruthy();
        });

        it('should deserialize with correct primitives type', () => {
           const deserializedModel = deserialize(tJSON, TestModel);
           expect(deserializedModel.primitives instanceof Array).toBeTruthy();
           expect(deserializedModel.primitives.every(v => typeof v === 'number')).toBeTruthy();
        });

        it('should deserialize with correct data', () => {
            const deserializedModel = deserialize(tJSON, TestModel);
            expect(deserializedModel.primitives).toEqual(tJSON.primitives);
        });

        it('should correct serialize model', () => {
            const serializedJSON = serialize(tModel);
            expect(serializedJSON).toEqual(tJSON);
        })
    });

    describe('Model array', () => {
        class SubModel {
            @Field()
            id: number;

            static create(id: number): SubModel {
                const model = new SubModel();
                model.id  = id;
                return model;
            }
        }

        class TestModel {
            @Field({
                serializer: new ArraySerializer(new ModelSerializer(SubModel)),
                jsonPropertyName: 'children'
            })
            subModels: SubModel[];
        }
        const tJSON = {
            children: [{id: 12}, {id: 13}, {id: 14}]
        };
        const tModel = new TestModel();
        tModel.subModels = [SubModel.create(12), SubModel.create(13), SubModel.create(14)];

        it('should deserialize array with correct values', () => {
            const deserializedModel = deserialize(tJSON, TestModel);
            expect(deserializedModel.subModels instanceof Array).toBeTruthy();
            expect(deserializedModel.subModels.every(v => v instanceof SubModel)).toBeTruthy();
            expect(deserializedModel.subModels.every((v, indx) => v.id === tModel.subModels[indx].id)).toBeTruthy();
        });

        it('should correct serialize model', () => {
            const serializedJSON = serialize(tModel);
            expect(serializedJSON).toEqual(tJSON);
        });
    });
});