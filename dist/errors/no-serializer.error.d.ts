export declare class NoSerializerError extends Error {
    fieldKey: string | symbol;
    name: string;
    constructor(fieldKey: string | symbol, message?: string);
}
