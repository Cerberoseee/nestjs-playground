import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly defaultUser: User = {
    username: process.env.LOGIN_USERNAME,
    password: process.env.LOGIN_PASSWORD,
  };

  login(user: User) {
    if (user.username == null || user.password == null) {
      return {
        status: 400,
        message: 'Please provide parameters',
      };
    }

    if (
      user.username == this.defaultUser.username &&
      user.password == this.defaultUser.password
    ) {
      return {
        status: 500,
        message: 'Login successfully!',
      };
    } else {
      return {
        status: 400,
        message: 'Login failed!',
      };
    }
  }
}
