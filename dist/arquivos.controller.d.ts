import { ArquivosService } from './arquivos.service';
import { DiskStorageFile } from '@blazity/nest-file-fastify';
import { ArquivoDTO } from './dtos/arquivo.dto';
import { ArquivosEntity } from './entities/arquivos.entity';
export declare class ArquivosController {
    private readonly arquivoService;
    constructor(arquivoService: ArquivosService);
    upload(files: DiskStorageFile[], arquivoDTO: ArquivoDTO): Promise<boolean>;
    findAll(): Promise<ArquivosEntity[]>;
    destroy(id: number): Promise<boolean>;
    update(id: number, arquivoDTO: ArquivoDTO, file: DiskStorageFile): boolean;
}
