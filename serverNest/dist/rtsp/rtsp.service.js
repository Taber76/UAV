"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtspService = void 0;
const common_1 = require("@nestjs/common");
const Stream = require("node-rtsp-stream");
let RtspService = exports.RtspService = class RtspService {
    constructor() { }
    startStream(rtspIp) {
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
            return stream;
        }
        catch (error) {
            throw new Error(`Video stream not initialized. ${error}`);
        }
    }
    stopStream(stream) {
        try {
            stream.kill();
        }
        catch {
            throw new Error("Video stream not terminated.");
        }
    }
};
exports.RtspService = RtspService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RtspService);
//# sourceMappingURL=rtsp.service.js.map