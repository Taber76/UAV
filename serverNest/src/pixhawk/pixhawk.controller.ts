import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { PixhawkService } from './pixhawk.service';

@Controller('api/pixhawk')
export class PixhawkController {
  constructor(private readonly pixhawkService: PixhawkService) {}

  @Post('longcommand')
  async longCommand(@Body() data: any): Promise<any> {
    try {
      const response = await this.pixhawkService.longCommand(data);
      if (response.response === true) {
        const jsonmessage = JSON.parse(response.message);
        return {
          message: jsonmessage,
          response: response.response,
        };
      } else {
        throw new HttpException(
          JSON.stringify(response),
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
