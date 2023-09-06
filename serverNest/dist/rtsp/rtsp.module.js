"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtspModule = void 0;
const common_1 = require("@nestjs/common");
const rtsp_controller_1 = require("./rtsp.controller");
const rtsp_service_1 = require("./rtsp.service");
let RtspModule = exports.RtspModule = class RtspModule {
};
exports.RtspModule = RtspModule = __decorate([
    (0, common_1.Module)({
        controllers: [rtsp_controller_1.RtspController],
        providers: [rtsp_service_1.RtspService],
    })
], RtspModule);
//# sourceMappingURL=rtsp.module.js.map