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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegStreamController = void 0;
const common_1 = require("@nestjs/common");
const ffmpeg_service_1 = require("./ffmpeg.service");
let FfmpegStreamController = exports.FfmpegStreamController = class FfmpegStreamController {
    constructor(ffmpegService) {
        this.ffmpegService = ffmpegService;
    }
    onModuleInit() {
        this.ffmpegService.startStream(this.res);
    }
    onModuleDestroy() {
        this.ffmpegService.stopStream();
    }
    async getVideoStream(res) {
        this.res = res;
        res.type('mpegts');
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FfmpegStreamController.prototype, "getVideoStream", null);
exports.FfmpegStreamController = FfmpegStreamController = __decorate([
    (0, common_1.Controller)('api/video'),
    __metadata("design:paramtypes", [ffmpeg_service_1.FfmpegStreamService])
], FfmpegStreamController);
//# sourceMappingURL=ffmpeg.controller.js.map