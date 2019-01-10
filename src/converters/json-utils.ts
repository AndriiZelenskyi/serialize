import { ifPresentGet } from '../serializers/field.utils';

export function parseJsonPropertyName(fullName: string): string[] {
  return fullName.split('.');
}

export function setPropertyToJson(json: Object, propertyAddress: string[], value: any): Object {
  const { reduce, lastAddress } = reduceAddress(json, propertyAddress);
  if (lastAddress && value !== undefined) {
    reduce[lastAddress] = value;
  }
  return json;
}

export function getPropertyOfJson(json: Object, propertyAddress: string[]): Object | null {
  const { reduce, lastAddress } = reduceAddress(json, propertyAddress);
  const value = reduce[ifPresentGet(lastAddress, '')(lastAddress)];
  return ifPresentGet(value, null)(value);
}

function reduceAddress(json: Object, propertyAddress: string[]): { lastAddress: string, reduce: { [k: string]: any } } {
  const copyOfAddress = propertyAddress.map(v => '' + v);
  const lastAddress = copyOfAddress.pop() || '';
  const reduce: { [k: string]: any } = copyOfAddress.reduce((pV: { [k: string]: any }, cV) => {
    if (pV[cV] === undefined) {
      pV[cV] = {};
    }
    return pV[cV];
  }, json);
  return { lastAddress, reduce };
}
