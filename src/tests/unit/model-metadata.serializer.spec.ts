import { Field } from '../../decorators';
import { ModelMetadataSerializer } from '../../serializers/model-metadata.serializer';

class TestModel {
  @Field({ jsonPropertyName: 'server-id' })
  id: number;

  @Field()
  body: string;

  @Field({jsonPropertyName: 'nested.nested.path'})
  complicatedPathVariable: number;
}

describe('ModelMetadataSerializer', () => {
  let serializer: ModelMetadataSerializer<TestModel>;
  const JSON = {
    'server-id': 12,
    'body': 'Lorem Ipsum',
    nested: {
      nested: {
        path: 48
      }
    }
  };

  beforeEach(() => {
    serializer = new ModelMetadataSerializer<TestModel>(TestModel);
  });

  it('should deserialize model with a correct prototype', () => {
    expect(serializer.deserialize(JSON) instanceof TestModel).toBeTruthy();
  });

  it('should deserialize fields correctly', () => {
    const model = serializer.deserialize(JSON);
    expect(model).not.toBeUndefined();
    // @ts-ignore
    expect(model.id).toEqual(12);
    // @ts-ignore
    expect(model.body).toEqual(JSON.body);
    // @ts-ignore
    expect(model.complicatedPathVariable).toEqual(JSON.nested.nested.path);
  });

  it('should serialize model with correct paths', () => {
    const model = new TestModel();
    model.id = 24;
    model.body = 'Test body';
    model.complicatedPathVariable = 48;
    const expected = { 'server-id': 24, body: 'Test body', nested: {nested: {path: 48}} };
    expect(serializer.serialize(model)).toEqual(expected);
  });
});
