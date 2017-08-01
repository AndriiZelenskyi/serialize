const DEFAULT_ERROR_MESSAGE = 'No serializer! Use serializer from config or serializer factory!';

export class NoSerializerError extends Error {
    public name = "NoSerializerError";
    constructor(public fieldKey: string | symbol, message: string = DEFAULT_ERROR_MESSAGE) {
        super(`${message}. For field key: ${fieldKey}`);
    }
}