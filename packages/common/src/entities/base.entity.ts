import { PrimaryGeneratedColumn } from 'typeorm';
import { DateColumn } from './_date.entity';

export class Base extends DateColumn {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;
}
