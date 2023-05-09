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
exports.ArquivosController = void 0;
const common_1 = require("@nestjs/common");
const arquivos_service_1 = require("./arquivos.service");
const nest_file_fastify_1 = require("@blazity/nest-file-fastify");
const constante_1 = require("./constantes/constante");
const arquivo_dto_1 = require("./dtos/arquivo.dto");
const arquivos_entity_1 = require("./entities/arquivos.entity");
let ArquivosController = class ArquivosController {
    constructor(arquivoService) {
        this.arquivoService = arquivoService;
    }
    async upload(files, arquivoDTO) {
        try {
            await Promise.all(files.map(async (file) => {
                const newArquivo = new arquivos_entity_1.ArquivosEntity();
                if (arquivoDTO.nome.length == 0) {
                    throw new common_1.BadRequestException({
                        message: 'informe todos os campos',
                    });
                }
                newArquivo.nome = arquivoDTO.nome;
                newArquivo.arquivo = file.filename;
                this.arquivoService.uploadFile(newArquivo);
            }));
            return true;
        }
        catch (e) {
            await Promise.all(files.map(async (file) => {
                (0, constante_1.unlinkAsync)(file.path);
            }));
            throw new common_1.HttpException(e.response, e.status);
        }
    }
    findAll() {
        return this.arquivoService.findAll();
    }
    destroy(id) {
        return this.arquivoService.destroy(id);
    }
    update(id, arquivoDTO, file) {
        const newArquivo = new arquivos_entity_1.ArquivosEntity();
        newArquivo.nome = arquivoDTO.nome;
        newArquivo.arquivo = file.filename;
        this.arquivoService.updateArquivo(id, newArquivo);
        return true;
    }
};
__decorate([
    (0, common_1.Post)('/uploadFile'),
    (0, common_1.UseInterceptors)((0, nest_file_fastify_1.FilesInterceptor)('files', 10, { dest: constante_1.pathUploads })),
    __param(0, (0, nest_file_fastify_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, arquivo_dto_1.ArquivoDTO]),
    __metadata("design:returntype", Promise)
], ArquivosController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)('/findUploads'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArquivosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)('/destroy/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArquivosController.prototype, "destroy", null);
__decorate([
    (0, common_1.Patch)('/updateUploads/:id'),
    (0, common_1.UseInterceptors)((0, nest_file_fastify_1.FileInterceptor)('file', { dest: constante_1.pathUploads })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, nest_file_fastify_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, arquivo_dto_1.ArquivoDTO, Object]),
    __metadata("design:returntype", void 0)
], ArquivosController.prototype, "update", null);
ArquivosController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [arquivos_service_1.ArquivosService])
], ArquivosController);
exports.ArquivosController = ArquivosController;
//# sourceMappingURL=arquivos.controller.js.map