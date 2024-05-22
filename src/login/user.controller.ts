import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('login')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async fetch() {
    return {
      status: 500,
      message: 'Login Route is working',
    };
  }

  @Post()
  async login(@Body() user: UserDto) {
    return this.userService.login(user);
  }
}
