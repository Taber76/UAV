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
exports.UavController = void 0;
const common_1 = require("@nestjs/common");
const uav_service_1 = require("./uav.service");
const global_service_1 = require("../global/global.service");
const uav_model_1 = require("./uav.model");
let UavController = exports.UavController = class UavController {
    constructor(uavService, globalService) {
        this.uavService = uavService;
        this.globalService = globalService;
        this.uavInstances = {};
    }
    async longCommand(data) {
        try {
            const response = await this.uavInstances[data.uavname].longCommand(data);
            if (response.response === true) {
                const jsonmessage = JSON.parse(response.message);
                return {
                    message: jsonmessage,
                    response: response.response,
                };
            }
            else {
                throw new common_1.HttpException(JSON.stringify(response), common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getInfo(data) {
        try {
            const info = data.info;
            const uavInstance = this.uavInstances[data.uavname];
            if (uavInstance) {
                return uavInstance.getInfo(info);
            }
            else {
                throw new common_1.HttpException('UAV not found', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getStatus(data) {
        const uavInstance = this.uavInstances[data.uavname];
        if (uavInstance) {
            return uavInstance.getStatus();
        }
        else {
            throw new common_1.HttpException('UAV not found', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPosition(data) {
        const uavInstance = this.uavInstances[data.uavname];
        if (uavInstance) {
            return uavInstance.getPosition();
        }
        else {
            throw new common_1.HttpException('UAV not found', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getMessage(data) {
        try {
            if (data.uavname in this.uavInstances) {
                return this.uavInstances[data.uavname].getMessage(data.message);
            }
            else {
                throw new common_1.HttpException('UAV not found', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async register(data) {
        try {
            const response = await this.uavService.register(data);
            return response;
        }
        catch (error) {
            throw new common_1.HttpException({ response: false, error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async list() {
        return this.uavInstances;
    }
    async getUavUrl(name) {
        try {
            if (name === this.globalService.uavName) {
                return {
                    result: true,
                };
            }
            return {
                result: false,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async connect(data, ip) {
        try {
            const response = await this.uavService.uavConection(data.uavname, data.password);
            if (response.response === true) {
                const newUAVInsance = new uav_model_1.UAV(data.uavname, "http://192.168.1.17:8080");
                this.uavInstances[data.uavname] = newUAVInsance;
                this.globalService.uavUrl = "http://192.168.1.17:8080";
                this.globalService.uavName = data.uavname;
                return { response: true };
            }
            else {
                return { response: false };
            }
        }
        catch {
            throw new common_1.HttpException({ response: false }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async jwt(data) {
        try {
            this.globalService.jwtUav = data.jwt;
            return { response: true };
        }
        catch {
            throw new common_1.HttpException({ response: false }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)('longcommand'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UavController.prototype, "longCommand", null);
__decorate([
    (0, common_1.Get)('info'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UavController.prototype, "getInfo", null);
__decorate([
    (0, common_1.Get)('status'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UavController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)('position'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UavController.prototype, "getPosition", null);
__decorate([
    (0, common_1.Get)('message'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UavController.prototype, "getMessage", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UavController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UavController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('clientconnect'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UavController.prototype, "getUavUrl", null);
__decorate([
    (0, common_1.Post)('uavconnect'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UavController.prototype, "connect", null);
__decorate([
    (0, common_1.Post)('jwt'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UavController.prototype, "jwt", null);
exports.UavController = UavController = __decorate([
    (0, common_1.Controller)('api/uav'),
    __metadata("design:paramtypes", [uav_service_1.UavService,
        global_service_1.GlobalService])
], UavController);
//# sourceMappingURL=uav.controller.js.map