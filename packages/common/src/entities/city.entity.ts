import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateColumn } from './_date.entity';
import { Subway } from './subway.entity';
import { House } from './house.entity';

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

  @Column({ default: 0, comment: '是否开通 0 未开通 1 已开通' })
  status!: number;

  @OneToMany(() => Subway, subway => subway.city)
  subways?: Subway[];

  @OneToMany(() => House, house => house.city)
  houses?: House[];
}
