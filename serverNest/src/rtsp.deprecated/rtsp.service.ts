import { Injectable } from "@nestjs/common";
const Stream = require("node-rtsp-stream")

@Injectable()
export class RtspService {
  constructor() { }

  startStream(rtspIp: string): any {
    try {
      const stream = new Stream({
        name: "rtspVideoStream",
        streamUrl: rtspIp,
        wsPort: 8554,
        ffmpegOptions: {
          '-rtsp_transport': 'tcp',
          '-stats': '',
          '-r': 30,
          'size': '640x480',
        }
      });
      return stream
    } catch (error) {
      throw new Error(`Video stream not initialized. ${error}`);
    }
  }
  stopStream(stream: any): void {
    try {
      stream.kill();
    } catch {
      throw new Error("Video stream not terminated.");
    }
  }

}