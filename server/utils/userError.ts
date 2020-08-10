import { debug } from 'console';

export default class UserError extends Error {
  type: string | undefined;

  status: number;

  mainError: any;

  validationError: Record<string, unknown>;

  constructor(
    message: string,
    status = 500,
    type = undefined,
    error = undefined,
    validationError?: any,
  ) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.type = type;
    this.mainError = error;
    this.validationError = validationError;
    if (error) debug('Error: ', error);

    if (status === 500 || error) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
