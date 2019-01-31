import { Model, Serializer, Field, serialize, deserialize } from '../';

function isJSONCorrect(json: Object): json is {name: string} {
  return json !== undefined && json.hasOwnProperty('name');
}

class TestModelSerializer implements Serializer<TestModel> {
  deserialize(json: Object): TestModel | null {
    if(isJSONCorrect(json)) {
      const deserializedModel = new TestModel();
      const [bar, foo] = json.name.split(';');
      deserializedModel.bar = bar;
      deserializedModel.foo = foo;
      return deserializedModel;
    } else {
      return null;
    }
  }

  serialize(model: TestModel): Object | null {
    return {name: model.bar + ';' + model.foo};
  }

}

const serializer = new TestModelSerializer();

@Model(serializer)
class TestModel {
  @Field()
  foo: string = 'Lorem ipsum';
  @Field()
  bar: string = 'Bob marley';
}
describe('Custom class serializer', () => {

  it('should use a custom serializer for whole model', () => {
    spyOn(serializer, 'serialize').and.callThrough();
    const model = new TestModel();
    serialize(model);
    expect(serializer.serialize).toHaveBeenCalledTimes(1);
  });

  it('should use a result from serializer as serialized value', () => {
    spyOn(serializer, 'serialize').and.returnValue({name: 'test'});
    const model = new TestModel();
    expect(serialize(model)).toEqual({name: 'test'});
  });

  it('should use a custom serializer for a deserialization', () => {
    spyOn(serializer, 'deserialize').and.callThrough();
    const JSON = {name: 'Test;Lor'};
    deserialize(JSON, TestModel);
    expect(serializer.deserialize).toHaveBeenCalledTimes(1);
  });

  it('should use a result from a custom serializer for a deserialization', () => {
    const JSON = {name: 'Test;Lor'};
    spyOn(serializer, 'deserialize').and.returnValue('Test');
    expect(deserialize(JSON, TestModel)).toEqual(<any>'Test');
  });
});
