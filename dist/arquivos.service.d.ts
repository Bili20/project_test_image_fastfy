import { ArquivosEntity } from './entities/arquivos.entity';
import { Repository } from 'typeorm';
import { ArquivoDTO } from './dtos/arquivo.dto';
export declare class ArquivosService {
    private readonly arquivoRepository;
    constructor(arquivoRepository: Repository<ArquivosEntity>);
    uploadFile(arquivoDTO: ArquivoDTO): Promise<ArquivosEntity>;
    findAll(): Promise<ArquivosEntity[]>;
    destroy(id: number): Promise<boolean>;
    updateArquivo(id: number, arquivoDTO: ArquivoDTO): Promise<boolean>;
}
