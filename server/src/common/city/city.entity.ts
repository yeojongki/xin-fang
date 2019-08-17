import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SubwayEntity } from '../subway/subway.entity';

@Entity('city')
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '中文名称' })
  name: string;

  @Column({ comment: '拼音名称' })
  pinyin: string;

  @Column({ comment: '城市code' })
  code: number;

  @Column({ comment: '拼音前缀' })
  pre: string;

  @OneToMany(() => SubwayEntity, subway => subway.city)
  subways: SubwayEntity[];
}
