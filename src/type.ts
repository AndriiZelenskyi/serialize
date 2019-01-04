export type Constructor<T extends Object> = {new(): T};

export function isConstructor<T>(candidate: any): candidate is Constructor<T> {
    if(typeof candidate === 'function') {
        return true;
    }
    return false;
}
