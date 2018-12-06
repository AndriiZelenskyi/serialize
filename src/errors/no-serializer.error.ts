const DEFAULT_ERROR_MESSAGE = 'No serializer! Use serializer from config or serializer factory!\n Maybe you miss @Model at your model class?';

export class NoSerializerError extends Error {
    public name = "NoSerializerError";
    constructor(public fieldKey: string, message: string = DEFAULT_ERROR_MESSAGE) {
        super(`${message}. For field key: ${fieldKey}`);
    }
}