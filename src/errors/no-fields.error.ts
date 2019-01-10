const defaultErrorMessage = 'Model without available fields for serialization. Did you miss Field()?';

export class NoFieldsError extends Error {
  public name = 'NoFieldsError';

  constructor(public message: string = defaultErrorMessage) {
    super(message);
  }
}
