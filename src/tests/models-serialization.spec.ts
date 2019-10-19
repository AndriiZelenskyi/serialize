import { Model, Field, Name, deserialize, serialize } from '..';

@Model()
class SubModel {
  @Field()
  id: number;
  @Field()
  body: string;
}

class TestModel {
  @Field()
  subModel: SubModel;

  @Field()
  @Name('inputModel')
  secondSubModel: SubModel;
}

describe('Model serialization', function() {
  const tJSON = {
    subModel: {
      id: 12,
      body: 'Test body text'
    },
    inputModel: {
      id: 13,
      body: 'Test second body text'
    }
  };

  const tModel = new TestModel();
  tModel.subModel = new SubModel();
  tModel.subModel.id = 12;
  tModel.subModel.body = 'Test body text';
  tModel.secondSubModel = new SubModel();
  tModel.secondSubModel.id = 13;
  tModel.secondSubModel.body = 'Test second body text';

  it('should correct set deserialized model type', () => {
    const deserializedModel = deserialize(tJSON, TestModel);
    expect(deserializedModel instanceof TestModel).toBeTruthy();
  });

  it('should correct ser sub model type', () => {
    const deserializedModel = deserialize(tJSON, TestModel);
    expect(deserializedModel.subModel instanceof SubModel).toBeTruthy();
    expect(deserializedModel.secondSubModel instanceof SubModel).toBeTruthy();
  });

  it('should deserialize subModel', () => {
    const deserializedModel = deserialize(tJSON, TestModel);
    expect(deserializedModel).toEqual(tModel);
  });

  it('should serialize whole model', () => {
    const serializedJSON = serialize(tModel);
    expect(serializedJSON).toEqual(tJSON);
  });

  it('should deserialize secondSubModel', () => {
    const deserializedModel = deserialize(tJSON, TestModel);
    expect(deserializedModel.secondSubModel).toEqual(tModel.secondSubModel);
  });
});
