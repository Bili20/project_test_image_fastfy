import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ArquivosService } from './arquivos.service';

import {
  DiskStorageFile,
  FileInterceptor,
  FilesInterceptor,
  UploadedFile,
  UploadedFiles,
} from '@blazity/nest-file-fastify';
import { pathUploads, unlinkAsync } from './constantes/constante';
import { ArquivoDTO } from './dtos/arquivo.dto';
import { ArquivosEntity } from './entities/arquivos.entity';

@Controller()
export class ArquivosController {
  constructor(private readonly arquivoService: ArquivosService) {}

  @Post('/uploadFile')
  @UseInterceptors(FilesInterceptor('files', 10, { dest: pathUploads }))
  async upload(
    @UploadedFiles() files: DiskStorageFile[],
    @Body() arquivoDTO: ArquivoDTO,
  ) {
    try {
      await Promise.all(
        files.map(async (file) => {
          const newArquivo = new ArquivosEntity();
          if (arquivoDTO.nome.length == 0) {
            throw new BadRequestException({
              message: 'informe todos os campos',
            });
          }
          newArquivo.nome = arquivoDTO.nome;
          newArquivo.arquivo = file.filename;
          this.arquivoService.uploadFile(newArquivo);
        }),
      );
      return true;
    } catch (e) {
      await Promise.all(
        files.map(async (file) => {
          unlinkAsync(file.path);
        }),
      );
      throw new HttpException(e.response, e.status);
    }
  }
  @Get('/findUploads')
  findAll() {
    return this.arquivoService.findAll();
  }
  @Delete('/destroy/:id')
  destroy(@Param('id') id: number) {
    return this.arquivoService.destroy(id);
  }
  @Patch('/updateUploads/:id')
  @UseInterceptors(FileInterceptor('file', { dest: pathUploads }))
  update(
    @Param('id') id: number,
    @Body() arquivoDTO: ArquivoDTO,
    @UploadedFile() file: DiskStorageFile,
  ) {
    const newArquivo = new ArquivosEntity();
    newArquivo.nome = arquivoDTO.nome;
    newArquivo.arquivo = file.filename;
    this.arquivoService.updateArquivo(id, newArquivo);
    return true;
  }
}
