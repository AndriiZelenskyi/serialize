import { Model } from '../decorators';
import { Field } from '../decorators/field.decorator';
import { profile } from '../serializers/profile.serializer';
import { model } from '../serializers/model-metadata.serializer';
import { serialize } from '../converters';
import { deserialize } from '../converters/deserialize';

@Model()
class Reference {
  @Field()
  id: string;
}

@Model()
class NestedModel {
  @Field()
  id: string;
  @Field()
  name: string;
}

enum NestedProfiles {
  REFERENCE = 'REFERENCE'
}

const modelSerializer = model(NestedModel);

const referenceSerializer = model(Reference);

@Model()
class TestModel {
  @Field()
  id: string;
  @Field()
  description: string;
  @Field({
    serializer: profile({ default: modelSerializer, [NestedProfiles.REFERENCE]: referenceSerializer })
  })
  child: NestedModel | Reference;
}

describe('Profiles', () => {
  it('should create a model', () => {
    const model = createTestModel('42', 'Test description', { id: '24', name: 'Child' });

    expect(model).toBeDefined();
  });

  it('should serialize model with default serializer', () => {
    const testModel = createTestModel('42', 'Test description', { id: '24', name: 'Child' });
    spyOn(modelSerializer, 'serialize').and.callThrough();

    serialize(testModel);

    expect(modelSerializer.serialize).toHaveBeenCalled();
  });

  it('should deserialize json with default serializer', () => {
    const json = { id: '42', description: 'Test description', child: { id: '24', name: 'Child' } };
    spyOn(modelSerializer, 'deserialize').and.callThrough();

    deserialize(json, TestModel);

    expect(modelSerializer.deserialize).toHaveBeenCalled();
  });

  it('should serialize model with reference serializer', () => {
    const testModel = createTestModel('42', 'Test description', { id: '24', name: 'Test name' });
    spyOn(referenceSerializer, 'serialize').and.callThrough();

    serialize(testModel, NestedProfiles.REFERENCE);

    expect(referenceSerializer.serialize).toHaveBeenCalled();
  });

  it('should deserialize model with reference serializer', () => {
    const json = { id: '42', description: 'Test description', child: { id: '24', name: 'Child' } };
    spyOn(referenceSerializer, 'deserialize').and.callThrough();

    deserialize(json, TestModel, NestedProfiles.REFERENCE);

    expect(referenceSerializer.deserialize).toHaveBeenCalled();
  });
});

function createTestModel(id: string, description: string, child: { id: string; name: string }): TestModel {
  const test = new TestModel();
  test.id = id;
  test.description = description;
  test.child = new NestedModel();
  test.child.id = child.id;
  (test.child as NestedModel).name = child.name;
  return test;
}
