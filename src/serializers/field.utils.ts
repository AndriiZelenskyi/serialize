export function isPresent(obj: Object): boolean {
  return obj !== undefined && obj !== null;
}

export function ifPresentGet<T, K>(presentResult: T, notPresentResult: K): (obj: Object) => T | K {
  return obj => isPresent(obj) ? presentResult : notPresentResult;
}
