export class Exception extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotfoundException extends Exception {
  constructor(message: string = 'Forbidden error') {
    super(400, message);
  }
}

export class BadRequestException extends Exception {
  constructor(message: string = 'Bad request') {
    super(400, message);
  }
}

export class ConflictException extends Exception {
  constructor(message: string = 'something went wrong') {
    super(409, message);
  }
}

export class UnauthorizedException extends Exception {
  constructor(message: string = 'Unauthorized error') {
    super(401, message);
  }
}

export class ForbiddenException extends Exception {
  constructor(message: string = 'Forbidden error') {
    super(403, message);
  }
}

export class UnprocessableException extends Exception {
  constructor(message: string = 'Unprocessable error') {
    super(422, message);
  }
}
