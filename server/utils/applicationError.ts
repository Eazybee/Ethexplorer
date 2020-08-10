import { debug } from 'console';

export default class ApplicationError extends Error {
  type: string | undefined;

  status: number;

  mainError: any;

  constructor(message: string, status = 500, type = undefined, error = undefined) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.type = type;
    this.mainError = error;

    if (error) debug('Error: ', error);

    if (status === 500 || error) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
