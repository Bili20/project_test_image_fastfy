"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArquivosModule = void 0;
const common_1 = require("@nestjs/common");
const arquivos_controller_1 = require("./arquivos.controller");
const arquivos_service_1 = require("./arquivos.service");
const typeorm_1 = require("@nestjs/typeorm");
const arquivos_entity_1 = require("./entities/arquivos.entity");
let ArquivosModule = class ArquivosModule {
};
ArquivosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([arquivos_entity_1.ArquivosEntity])],
        controllers: [arquivos_controller_1.ArquivosController],
        providers: [arquivos_service_1.ArquivosService],
    })
], ArquivosModule);
exports.ArquivosModule = ArquivosModule;
//# sourceMappingURL=arquivo.module.js.map