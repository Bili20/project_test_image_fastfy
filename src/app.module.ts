import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { ArquivosModule } from './arquivo.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ArquivosModule],
})
export class AppModule {}
