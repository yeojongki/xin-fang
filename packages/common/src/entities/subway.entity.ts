import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DateColumn } from './_date.entity';
import { City } from './city.entity';

@Entity('subway')
export class Subway extends DateColumn {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '城市名称' })
  name!: string;

  @Column({ name: 'city_id', comment: '城市名称' })
  cityId!: number;

  @ManyToOne(() => City, city => city.subways)
  @JoinColumn({ name: 'city_id' })
  city?: City;
}
