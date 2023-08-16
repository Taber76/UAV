import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';

import { UserService } from './user.service';
import { UserData, UserLog } from 'src/types/user.types';

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

  @Post('login')
  async login(@Body() data: UserLog): Promise<any> {
    try {
      const response = await this.userService.login(data);
      return response;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}