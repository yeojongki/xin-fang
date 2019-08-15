import { BaseEntity } from '../base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('city')
export class CityEntity extends BaseEntity {
  @Column({ comment: '城市名称', unique: true })
  name: string;
}
