/**
 * Convert model to json with metadata names
 *
 * Fields that not are labeled as {@link Field} will be ignore
 *
 * @param {Object} model Serializable model that was convert to json
 * @returns {Object} Server object
 */
export declare function serialize(model: Object): Object;
