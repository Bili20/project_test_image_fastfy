import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Arquivos')
export class ArquivosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'arquivo' })
  arquivo: string;
}
