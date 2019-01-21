import { deserialize, Field, serialize, Serializer, Type } from '../';

describe('Serialize decorator', () => {
  class CustomSerializer implements Serializer<any> {
    serialize(model: any): Object {
      return model;
    }

    deserialize(json: Object): any {
      return json;
    }
  }

  class TestModel {
    @Field()
    id: number;

    @Field()
    @Type(new CustomSerializer())
    customField: any;
  }

  it('should serialize', () => {
    const model = new TestModel();
    model.customField = 'test';
    model.id = 12;

    expect(serialize(model)).toEqual({ id: 12, customField: 'test' });
  });

  it('should deserialize', () => {
    const json = { id: 12, customField: 'test' };
    const deserializedModel = deserialize(json, TestModel);
    expect(deserializedModel instanceof TestModel).toBeTruthy();
    expect(deserializedModel.id).toEqual(12);
    expect(deserializedModel.customField).toEqual('test');
  });
});
