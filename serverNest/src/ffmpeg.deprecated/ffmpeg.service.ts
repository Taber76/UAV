import { Injectable } from '@nestjs/common';
import ffmpeg from 'fluent-ffmpeg';

@Injectable()
export class FfmpegStreamService {
  private ffmpegCommand;

  startStream(outputStream): void {
    this.ffmpegCommand = ffmpeg('rtsp://your-raspberry-pi-ip:your-rtsp-port')
      .inputFormat('rtsp')
      .inputOption('-rtsp_transport tcp') // Cambia según tu configuración
      .videoCodec('mpeg1video')
      .size('640x480')
      .videoBitrate('800k')
      .fps(30)
      .outputFormat('mpegts')
      .outputOption('-muxdelay 0.001')
      .pipe(outputStream, { end: true });
  }

  stopStream(): void {
    if (this.ffmpegCommand) {
      this.ffmpegCommand.kill();
      this.ffmpegCommand = null;
    }
  }
}


