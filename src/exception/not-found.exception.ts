import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message?: string, statusCode?: number, code?: number) {
    super(
      {
        message: message || 'Not Found',
        code: code || 'Not Found',
        statusCode: statusCode || HttpStatus.NOT_FOUND,
        error: true,
      },
      statusCode || HttpStatus.NOT_FOUND,
    );
  }
}
