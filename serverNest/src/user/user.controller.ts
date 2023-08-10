import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';

import { UserService } from './user.service';
import { UserData } from 'src/types/user.types';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() data: UserData): Promise<any> {
    try {
      const response = await this.userService.register(data);
      return response;
    } catch (error) {
      throw new HttpException({ response: false, error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}