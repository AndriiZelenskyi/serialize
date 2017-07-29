declare class Error {
    public name: string;
    // noinspection JSUnusedGlobalSymbols
    public message: string;
    // noinspection JSUnusedGlobalSymbols
    public stack: string;
    constructor(message?: string);
}

const defaultErrorMessage = "Model without available fields for serialization. Did you miss SerializableField()?";

export class NoFieldsError extends Error {
    public name = "NoFieldsError";

    constructor(public message: string = defaultErrorMessage) {
        super(message);
    }
}