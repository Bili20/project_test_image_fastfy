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
exports.ArquivosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const arquivos_entity_1 = require("./entities/arquivos.entity");
const typeorm_2 = require("typeorm");
const constante_1 = require("./constantes/constante");
let ArquivosService = class ArquivosService {
    constructor(arquivoRepository) {
        this.arquivoRepository = arquivoRepository;
    }
    async uploadFile(arquivoDTO) {
        const data = this.arquivoRepository.create(arquivoDTO);
        await this.arquivoRepository.save(arquivoDTO);
        return data;
    }
    async findAll() {
        const data = await this.arquivoRepository.find();
        return data;
    }
    async destroy(id) {
        const data = await this.arquivoRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!data) {
            throw new common_1.BadRequestException({ messgage: 'Arquivo não encontrado' });
        }
        await this.arquivoRepository.delete(data);
        if ((0, constante_1.existsAsync)(`./uploads/${data.arquivo}`)) {
            (0, constante_1.unlinkAsync)(`./uploads/${data.arquivo}`);
        }
        else {
            throw new common_1.BadRequestException({ message: 'Arquivo não encontrado' });
        }
        return true;
    }
    async updateArquivo(id, arquivoDTO) {
        try {
            const data = await this.arquivoRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!data) {
                throw new common_1.BadRequestException({ messgage: 'Arquivo não encontrado' });
            }
            if (data.arquivo) {
                (0, constante_1.unlinkAsync)(`./uploads/${data.arquivo}`);
            }
            await this.arquivoRepository.update(id, arquivoDTO);
            return true;
        }
        catch (e) {
            console.log(e);
            throw new common_1.HttpException(e.response, e.status);
        }
    }
};
ArquivosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(arquivos_entity_1.ArquivosEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArquivosService);
exports.ArquivosService = ArquivosService;
//# sourceMappingURL=arquivos.service.js.map