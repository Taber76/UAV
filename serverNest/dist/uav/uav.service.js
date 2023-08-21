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
exports.UavService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const uav_schema_1 = require("./uav.schema");
const global_service_1 = require("../global/global.service");
const bcrypt = require("bcrypt");
let UavService = exports.UavService = class UavService {
    constructor(uavModel, globalService) {
        this.uavModel = uavModel;
        this.globalService = globalService;
    }
    async register(uav) {
        uav.password = await bcrypt.hash(uav.password, 10);
        try {
            return await this.uavModel.create(uav);
        }
        catch (error) {
            throw error;
        }
    }
    async uavConection(uavname, password) {
        const uav = await this.uavModel.findOne({ uavname });
        if (!uav) {
            return { response: false };
        }
        const isMatch = await bcrypt.compare(password, uav.password);
        if (isMatch) {
            return { response: true };
        }
    }
};
exports.UavService = UavService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(uav_schema_1.Uav.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        global_service_1.GlobalService])
], UavService);
//# sourceMappingURL=uav.service.js.map