export class PokelibError extends Error {
  error: string;
  message: string;
  statusCode: number;

  constructor(error: string, message: string, statusCode: number) {
    super(error);
    this.error = error;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class ValidationError extends Error {
  errors: string[];

  constructor(message: string, errors: string[]) {
    super(message);
    this.errors = errors;
  }
}
