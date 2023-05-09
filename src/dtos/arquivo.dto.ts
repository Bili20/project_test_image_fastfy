import { IsNotEmpty, IsString } from 'class-validator';

export class ArquivoDTO {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  arquivo: string;
}
