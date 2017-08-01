# Serialize TS

Serializers for typescript based on decorators

For use this library you must activate
```emitDecoratorMetadata```
property on you`r tsconfig.json file, or define serializer for every field

Model example:
```typescript
class TestModel {
    @Field({
        name: 'server-id'
    }) id: number;
    
    @Field()
    fullName: string;
    
    ignoredField: any;
    
    @Field({name: 'custom-date-name'})
    startDate: Date;
}
```
Serialize : 
```typescript
const model = new TestModel();
model.id = 12;
model.fullName = 'Default full name';
model.ignoredField = {customName: 'test'};
model.startDate = new Date();

console.log(serialize(model));

/*Output -> {
    server-id: 12,
    fullName: 'Default full name',
    custom-date-name: '2017-08-01T06:09:53.802Z'
}*/
```
Deserialize : 
```typescript
const obj = {
    'server-id': 12,
    'fullName': 'Default full name',
    'custom-date-name': '2017-08-01T06:09:53.802Z'
}
console.log(deserialize(obj, TestModel));
/*Output -> TestModel {
    id: 12,
    fullName: 'Default full name',
    startDate: new Date('2017-08-01T06:09:53.802Z')
}*/
```