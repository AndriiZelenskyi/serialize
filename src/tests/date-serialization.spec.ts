import { Field } from '../decorators';
import { DateSerializer } from '../serializers';
import { deserialize, serialize } from '../converters';

class TestModel {
  @Field({ serializer: new DateSerializer() })
  date: Date;
}

describe('Date serialization', () => {
  const tJSON = {
    date: '2018-01-18T14:09:44.342Z'
  };
  const tModel = new TestModel();
  tModel.date = new Date('2018-01-18T14:09:44.342Z');

  it('should serialize model', () => {
    const serializedJSON = serialize(tModel);
    expect(serializedJSON).toEqual(tJSON);
  });

  it('should correct deserialize model', () => {
    const deserializedModel = deserialize(tJSON, TestModel);
    expect(deserializedModel instanceof TestModel).toBeTruthy();
    expect(deserializedModel.date instanceof Date).toBeTruthy();
    expect(deserializedModel.date.getTime()).toEqual(new Date(tJSON.date).getTime());
  });
});
