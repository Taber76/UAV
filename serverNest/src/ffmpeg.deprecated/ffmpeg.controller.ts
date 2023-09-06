import { Controller, Get, Res, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Response } from 'express';
import { FfmpegStreamService } from './ffmpeg.service';

@Controller('api/video')
export class FfmpegStreamController implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly ffmpegService: FfmpegStreamService) { }

  onModuleInit() {
    this.ffmpegService.startStream(this.res);
  }

  onModuleDestroy() {
    this.ffmpegService.stopStream();
  }

  private res: Response<any>; // Añade un campo privado para almacenar la referencia a Response

  @Get()
  async getVideoStream(@Res() res: Response<any>) {
    this.res = res; // Almacena la referencia al objeto de respuesta
    res.type('mpegts');
    // No necesitas esta línea a menos que quieras manipular la respuesta de alguna manera
    // this.ffmpegService.getVideoStream().pipe(res, { end: true });
  }
}




