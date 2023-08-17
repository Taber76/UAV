"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UavModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const global_service_1 = require("../global/global.service");
const uav_controller_1 = require("./uav.controller");
const uav_service_1 = require("./uav.service");
const uav_schema_1 = require("./uav.schema");
let UavModule = exports.UavModule = class UavModule {
};
exports.UavModule = UavModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: uav_schema_1.Uav.name, schema: uav_schema_1.UavSchema }])],
        controllers: [uav_controller_1.UavController],
        providers: [uav_service_1.UavService, global_service_1.GlobalService],
    })
], UavModule);
//# sourceMappingURL=uav.module.js.map