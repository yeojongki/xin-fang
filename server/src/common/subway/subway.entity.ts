import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CityEntity } from '../city/city.entity';

@Entity('subway')
export class SubwayEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '城市名称' })
  name: string;

  @Column({ name: 'city_id', comment: '城市名称' })
  cityId: number;

  @ManyToOne(() => CityEntity, city => city.subways)
  @JoinColumn({name:'city_id'})
  city: CityEntity;
}
