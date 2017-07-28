export type Type<T extends Object> = Constructor<T>;

type Constructor<T extends Object> = {new(): T};