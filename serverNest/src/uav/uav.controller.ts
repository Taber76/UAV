import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Get,
  Query,
} from '@nestjs/common';
import { UavService } from './uav.service';
import { UavConnection, UavData, UavJwt } from 'src/types/uav.types';
import { GlobalService } from 'src/global/global.service';

@Controller('api/uav')
export class UavController {
  constructor(
    private readonly uavService: UavService,
    private readonly globalService: GlobalService,
  ) { }

  // From client
  @Post('longcommand')
  async longCommand(@Body() data: any): Promise<any> {
    try {
      const response = await this.uavService.longCommand(data);
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

  @Post('register')
  async register(@Body() data: UavData): Promise<any> {
    try {
      const response = await this.uavService.register(data);
      return response;
    } catch (error) {
      throw new HttpException({ response: false, error }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('clientconnect')
  async getUavUrl(@Query() name: string): Promise<any> {
    try {
      if (name === this.globalService.uavName) {
        return {
          result: true,
        }
      }
      return {
        result: false,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('status')
  async getStatus(): Promise<any> {
    this.uavService.getStatus();
    return this.globalService;
  }

  // From UAV
  @Post('uavconnect')
  async connect(@Body() data: UavConnection): Promise<any> {
    try {
      const response = await this.uavService.uavConection(
        data.uavname,
        data.password,
      );
      if (response.response === true) {
        this.globalService.uavUrl = data.url;
        this.globalService.uavName = data.uavname;
        return { response: true };
      } else {
        return {
          response: false,
        };
      }
    } catch {
      throw new HttpException({ response: false }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('jwt')
  async jwt(@Body() data: UavJwt): Promise<any> {
    try {
      this.globalService.jwtUav = data.jwt;
      return { response: true };
    } catch {
      throw new HttpException({ response: false }, HttpStatus.BAD_REQUEST);
    }
  }

}
