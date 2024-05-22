import { HttpException, HttpStatus } from '@nestjs/common';

export class BadGatewayException extends HttpException {
  constructor(message?: string, statusCode?: number, code?: number) {
    super(
      {
        message: message || 'Bad Gateway',
        code: code || 'Bad Gateway',
        statusCode: statusCode || HttpStatus.BAD_GATEWAY,
        error: true,
      },
      statusCode || HttpStatus.BAD_GATEWAY,
    );
  }
}
