import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Subway } from './subway.entity';

@Entity('city')
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '中文名称' })
  name!: string;

  @Column({ comment: '拼音名称' })
  pinyin!: string;

  @Column({ comment: '城市code' })
  code!: number;

  @Column({ comment: '拼音前缀' })
  pre!: string;

  @OneToMany(() => Subway, subway => subway.city)
  subways?: Subway[];
}
