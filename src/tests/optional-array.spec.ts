import { Field, Type, ArraySerializer, PrimitiveSerializer, ModelSerializer, serialize, deserialize } from '..';

class TestConfiguration {
  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  fields?: Array<string>;
}

class TestModel {
  @Field()
  @Type(new ModelSerializer(TestConfiguration))
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
    });

  });

  describe('Missing sub field', () => {
    const JSON = { configuration: {} };
    const model = new TestModel();
    model.configuration = new TestConfiguration();

    it('should serialize', () => {
      const serializedJSON = serialize(model);
      expect(serializedJSON).toEqual(JSON);
    });

    it('should deserialize', () => {
      const deserializedModel = deserialize(JSON, TestModel);
      expect(deserializedModel).toEqual(model);
    });
  });

  describe('Missing sub model', () => {
    const JSON = {};
    const model = new TestModel();

    it('should serialize', () => {
      const serializedJSON = serialize(model);
      expect(serializedJSON).toEqual(JSON);
    });

    it('should deserialize', () => {
      const deserializedModel = deserialize(JSON, TestModel);
      expect(deserializedModel).toEqual(model);
    });
  });
});
