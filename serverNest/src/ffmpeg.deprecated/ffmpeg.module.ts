import { Module } from '@nestjs/common';

import { GlobalService } from 'src/global/global.service';
import { FfmpegStreamController } from './ffmpeg.controller';
import { FfmpegStreamService } from './ffmpeg.service';

@Module({
  controllers: [FfmpegStreamController],
  providers: [FfmpegStreamService],
})
export class FfmpegModule { }

