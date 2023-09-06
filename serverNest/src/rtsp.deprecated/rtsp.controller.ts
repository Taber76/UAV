import { Controller, Post, Body, Res, HttpStatus, Get, Query, HttpException } from "@nestjs/common";
import { Response } from "express";

import { RtspService } from "./rtsp.service";

@Controller("api/video")
export class RtspController {
  constructor(private readonly rtspService: RtspService) { }

  private res: Response;

  @Post('rtsp')
  async getVideoStream(@Body() data: any) {
    try {
      await this.rtspService.startStream(data.rtspIp);
      return
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}