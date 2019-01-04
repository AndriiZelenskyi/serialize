# Serialize TS

Metadata library that created to resolve your pain with all mappers and type-checking of objects after serialization or deserialization.

Don`t use the spread operator for copying of your models because prototypes chain will be lost after it!

## Getting started

### Instalation

1. Add a dependency to your package.json file:

`npm install serialize-ts --save` or `yarn add serialize-ts`;
2. Change a tsconfig.json:

```json

{
    ...
    compilerOptions: {
        ...
        emitDecoratorMetadata: true,
        ...
    },
    ...
}

```

### Exmaples

#### Serialization

Simple model:

```typescript
class TestModel {
  @Field()
  @Name("sever-id")
  id: number;

  @Field()
  fullName: string;

  ignoredField: any;
}

const model = new TestModel();
model.id = 12;
model.fullName = "Default full name";
model.ignoredField = { customName: "test" };

console.log(serialize(model));

/*Output -> {
    server-id: 12,
    fullName: 'Default full name'
}*/

const obj = {
  "server-id": 12,
  fullName: "Default full name",
  "custom-date-name": "2017-08-01T06:09:53.802Z"
};

console.log(deserialize(obj, TestModel));

/*Output -> TestModel {
    id: 12,
    fullName: 'Default full name',
    startDate: new Date('2017-08-01T06:09:53.802Z')
}*/
```

Nested models:

```typescript
class OuterModel {
    @Field()
    id: number;

    @Field()
    nestedModel: NestedModel;
}

@Model()
class NestedModel {
    @Field()
    firstField: number;
    @Field()
    secondField: string;
}

const obj = {
    id: 12,
    nestedModel: {
        firstField: 24,
        secondField: 'Some awesome string!'
    }
};

const outerModel = deserialize(obj, TestModel);
console.log(outerModel);

/*
    Output -> OuterModel {
        id: 12,
        nestedModel: NestedModel {
            firstField: 24,
            secondField: "Some awesome string!"
        }
    }
*/

console.log(serialize(outerModel));

/*
    Output -> {
        id: 12,
        nestedModel: {
            firstField: 24,
            secondField: "Some awesome string!"
        }
    }
*/

```

Arrays:

```typescript
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
console.log(deserializedModel);
/*
    Output -> Test {
        id: 12,
        arrayOfNumber:  [12, 24, 36, 48]
    }
*/

```

Custom serializers:

```typescript
class CustomSerializer implements Serializer<Object> {
    serialize(model: Object) {
        // Do some custom logic
    }

    deserialize(json: Object) {
        // Do your custom logic and return deserialized object
    }
}

class Model {
    @Field()
    id: 12;

    @Field()
    @Type(new CustomSerializer())
    customField: any;
}

```

If you have some troubles with serialization without serializer decorator definition, you are able to define it with ```@Serializer(YourCustomModel)``` or with some default type like Date or String.
I am waiting for the issues of course!
