import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Get,
  Query,
  Ip
} from '@nestjs/common';
import { UavService } from './uav.service';
import { LongCommand, UavConnection, UavData, UavJwt } from 'src/types/uav.types';
import { GlobalService } from 'src/global/global.service';
import { UAV } from './uav.model';

@Controller('api/uav')
export class UavController {
  private uavInstances: { [key: string]: UAV } = {}

  constructor(
    private readonly uavService: UavService,
    private readonly globalService: GlobalService,
  ) { }

  // FROM CLIENT TO UAV -------------------------------------------------------
  // Long command to UAV
  @Post('longcommand')
  async longCommand(@Body() data: LongCommand): Promise<any> {
    try {
      const response = await this.uavInstances[data.uavname].longCommand(data);
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

  @Get('status')
  async getStatus(@Query() data: any): Promise<any> {
    const uavInstance = this.uavInstances[data.uavname];
    if (uavInstance) {
      return uavInstance.getStatus();
    } else {
      throw new HttpException('UAV not found', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('position')
  async getPosition(@Query() data: any): Promise<any> {
    const uavInstance = this.uavInstances[data.uavname];
    if (uavInstance) {
      return uavInstance.getPosition();
    } else {
      throw new HttpException('UAV not found', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('message')
  async getMessage(@Query() data: any): Promise<any> {
    try {
      if (data.uavname in this.uavInstances) {
        return this.uavInstances[data.uavname].getMessage(data.message);
      } else {
        throw new HttpException('UAV not found', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // FROM CLIENT TO THIS SERVER -------------------------------------------------
  // Register UAV
  @Post('register')
  async register(@Body() data: UavData): Promise<any> {
    try {
      const response = await this.uavService.register(data);
      return response;
    } catch (error) {
      throw new HttpException({ response: false, error }, HttpStatus.BAD_REQUEST);
    }
  }

  // List of UAVs connected
  @Get('list')
  async list(): Promise<any> {
    return this.uavInstances;
  }


  @Get('clientconnect') // en que estaba pensando?
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


  // FROM UAV --------------------------------------------------------------------
  // Power on connection
  @Post('uavconnect')
  async connect(@Body() data: UavConnection, @Ip() ip: string): Promise<any> {
    try {
      const response = await this.uavService.uavConection(
        data.uavname,
        data.password,
      );
      if (response.response === true) {
        const newUAVInsance = new UAV(data.uavname, "http://192.168.1.14:8080")//ip) //,data.jwt);
        this.uavInstances[data.uavname] = newUAVInsance;
        this.globalService.uavUrl = "http://192.168.1.14:8080" //ip;
        this.globalService.uavName = data.uavname;
        return { response: true };
      } else {
        return { response: false };
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
