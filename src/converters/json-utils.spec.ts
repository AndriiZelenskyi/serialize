import {parseJsonPropertyName, setPropertyToJson} from "./json-utils";

describe('JSON utils test', () => {
    const propertyNameWithPoints = 'user.authentication-information.email';
    const testAddress = ['user', 'authentication-information', 'email'];

    it('should parse json property name', () => {
        expect(parseJsonPropertyName(propertyNameWithPoints)).toEqual(testAddress);
    });

    it('should set property to JSON and return new object', () => {
        const obj = {};
        const email = 'test@test.com';
        const expectedObject = {
            user: {'authentication-information': {email}}
        };
        expect(setPropertyToJson(obj, testAddress, email)).toEqual(expectedObject);
    });

    it('should set property to existing JSON', () => {
        const obj = {
            user: {
                test: 'Test'
            }
        };
        const email = 'test@email.com';
        const expectedObject = {
            user: {test: 'Test', 'authentication-information': {email}}
        };

        expect(setPropertyToJson(obj, testAddress, email)).toEqual(expectedObject);
    })
});