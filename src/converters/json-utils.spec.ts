import { getPropertyOfJson, parseJsonPropertyName, setPropertyToJson } from './json-utils';

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
      user: { 'authentication-information': { email } }
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
      user: { test: 'Test', 'authentication-information': { email: email } }
    };

    expect(setPropertyToJson(obj, testAddress, email)).toEqual(expectedObject);
  });

  it('should return value of property by address', () => {
    const email = 'test@email.com';
    const obj = { user: { auth: { email } } };

    expect(getPropertyOfJson(obj, ['user', 'auth', 'email'])).toEqual(email);
  });

  it('should return null if address is incorrect', () => {
    const obj = { user: { auth: { email: 'TTTT' } } };

    expect(getPropertyOfJson(obj, ['test', 'auth', 'email'])).toBeNull();
  });

  it('should return null if value is empty', () => {
    const obj = { user: { auth: { email: undefined } } };

    expect(getPropertyOfJson(obj, ['user', 'auth', 'email'])).toBeNull();
  });

  it('should return zero from json', () => {
    const obj = { id: 0 };
    expect(getPropertyOfJson(obj, ['id'])).toEqual(0);
  });
});
