"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegStreamService = void 0;
const common_1 = require("@nestjs/common");
const fluent_ffmpeg_1 = require("fluent-ffmpeg");
let FfmpegStreamService = exports.FfmpegStreamService = class FfmpegStreamService {
    startStream(outputStream) {
        this.ffmpegCommand = (0, fluent_ffmpeg_1.default)('rtsp://your-raspberry-pi-ip:your-rtsp-port')
            .inputFormat('rtsp')
            .inputOption('-rtsp_transport tcp')
            .videoCodec('mpeg1video')
            .size('640x480')
            .videoBitrate('800k')
            .fps(30)
            .outputFormat('mpegts')
            .outputOption('-muxdelay 0.001')
            .pipe(outputStream, { end: true });
    }
    stopStream() {
        if (this.ffmpegCommand) {
            this.ffmpegCommand.kill();
            this.ffmpegCommand = null;
        }
    }
};
exports.FfmpegStreamService = FfmpegStreamService = __decorate([
    (0, common_1.Injectable)()
], FfmpegStreamService);
//# sourceMappingURL=ffmpeg.service.js.map