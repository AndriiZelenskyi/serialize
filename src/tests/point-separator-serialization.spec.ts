import {Field} from "../decorators";
import {deserialize, serialize} from "../converters";

class TestModel {
    @Field()
    id: number;

    @Field({name: 'user.authentication-information.email'})
    email: string;
}

describe('Point separation model serialization', () => {
    const tJSON = {id: 12, user: {'authentication-information': {email: 'test@test.com'}}};

    const tModel = new TestModel();
    tModel.id = 12;
    tModel.email = 'test@test.com';

    it('should deserialize model', () => {
        const deserializedModel = deserialize(tJSON, TestModel);
        expect(deserializedModel instanceof TestModel).toBeTruthy();
        expect(deserializedModel.id).toEqual(12);
        expect(deserializedModel.email).toEqual('test@test.com');
    });

    it('should serialize model', () => {
        const serializedJSON = serialize(tModel);
        expect(serializedJSON).toEqual(tJSON);
    });
});
