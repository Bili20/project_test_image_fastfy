import { Module } from '@nestjs/common';
import { ArquivosController } from 'src/arquivos.controller';
import { ArquivosService } from 'src/arquivos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquivosEntity } from './entities/arquivos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArquivosEntity])],
  controllers: [ArquivosController],
  providers: [ArquivosService],
})
export class ArquivosModule {}
