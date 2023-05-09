import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArquivosEntity } from './entities/arquivos.entity';
import { Repository } from 'typeorm';
import { ArquivoDTO } from './dtos/arquivo.dto';
import { existsAsync, unlinkAsync } from './constantes/constante';

@Injectable()
export class ArquivosService {
  constructor(
    @InjectRepository(ArquivosEntity)
    private readonly arquivoRepository: Repository<ArquivosEntity>,
  ) {}

  async uploadFile(arquivoDTO: ArquivoDTO) {
    const data = this.arquivoRepository.create(arquivoDTO);
    await this.arquivoRepository.save(arquivoDTO);
    return data;
  }
  async findAll() {
    const data = await this.arquivoRepository.find();
    return data;
  }
  async destroy(id: number) {
    const data = await this.arquivoRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!data) {
      throw new BadRequestException({ messgage: 'Arquivo não encontrado' });
    }
    await this.arquivoRepository.delete(data);
    if (existsAsync(`./uploads/${data.arquivo}`)) {
      unlinkAsync(`./uploads/${data.arquivo}`);
    } else {
      throw new BadRequestException({ message: 'Arquivo não encontrado' });
    }
    return true;
  }
  async updateArquivo(id: number, arquivoDTO: ArquivoDTO) {
    try {
      const data = await this.arquivoRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!data) {
        throw new BadRequestException({ messgage: 'Arquivo não encontrado' });
      }
      if (data.arquivo) {
        unlinkAsync(`./uploads/${data.arquivo}`);
      }
      await this.arquivoRepository.update(id, arquivoDTO);
      return true;
    } catch (e) {
      console.log(e);
      throw new HttpException(e.response, e.status);
    }
  }
}
