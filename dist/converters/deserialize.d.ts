import { Type } from "../type";
/**
 * Convert json for type that you need with updated names
 *
 * @param {Object} json
 * @param {Type<T extends Object>} modelType
 * @returns {T}
 */
export declare function deserialize<T extends Object>(json: Object, modelType: Type<T>): T;
