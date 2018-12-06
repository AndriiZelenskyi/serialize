export type Type<T extends Object> = {new(): T};

export function isType<T>(candidate: any): candidate is Type<T> {
    if(typeof candidate === 'function') {
        return true;
    }
    return false;
}
