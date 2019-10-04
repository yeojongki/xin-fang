import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateColumn } from './_date.entity';
import { Subway } from './subway.entity';

@Entity('city')
export class City extends DateColumn {
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

  @Column({ default: 0, comment: '是否启用 0 未启动 1 开启' })
  status!: number;

  @OneToMany(() => Subway, subway => subway.city)
  subways?: Subway[];
}
