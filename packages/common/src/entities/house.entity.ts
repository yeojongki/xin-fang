import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { Base } from './base.entity';
import { User } from './user.entity';
import { City } from './city.entity';
import { Subway } from './subway.entity';
import {
  HousePostType,
  HouseRentPayType,
  HouseRentType,
  HouseReviewed,
  HouseStatus,
} from '../constants/house.const';
import { isNotEmpty } from '../utils/is-empty';

@Entity('house')
export class House extends Base {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @Index()
  @Column({ default: -1, comment: '豆瓣 topic Id' })
  tid?: number;

  @Column({ comment: '标题' })
  title!: string;

  @Column({ length: 2000, default: '', comment: '内容详情' })
  content!: string;

  @Column({
    type: 'enum',
    enum: HousePostType,
    default: HousePostType.PLATFORM,
    comment: '发布类型(平台0/豆瓣1)',
  })
  postType!: number;

  @Column({
    length: 2000,
    comment: '图片列表',
    default: '',
    transformer: {
      from: (v) => (v && typeof v.split === 'function' ? v.split(',') : []),
      to: (v) => {
        if (!v) return '';
        if (Array.isArray(v)) {
          return v.length ? v.filter(isNotEmpty).join(',') : '';
        }
        return v.toString();
      },
    },
  })
  imgs!: string;

  @Column({
    type: 'enum',
    enum: HouseStatus,
    default: HouseStatus.OFF,
    comment: '房子状态(上架中0/已下架1)',
  })
  status?: number;

  @Column({
    type: 'enum',
    enum: HouseReviewed,
    default: HouseReviewed.NO,
    comment: '审核状态(未审核0/已审核1)',
  })
  reviewed!: number;

  @Column({ comment: '房子大小(平米)' })
  size!: number;

  @Column({
    type: 'enum',
    enum: HouseRentType,
    default: HouseRentType.UNKNOW,
    comment: '出租类型(整租0/合租1)',
  })
  rentType!: number;

  @Column({ comment: '房价(需结合出租支付类型计算)' })
  price!: number;

  @Column({
    type: 'enum',
    enum: HouseRentPayType,
    default: HouseRentPayType.MONTH,
    comment: '出租支付类型(月付0/季付1/天付2/年付3/面议4)',
  })
  rentPayType!: number;

  @Column({ default: 0, comment: '睡房数量' })
  bedroomNumber?: number;

  @Column({ default: 0, comment: '浴室数量' })
  bathroomNumber?: number;

  @Column({ default: 0, comment: '客厅数量' })
  livingroomNumber?: number;

  @Column({ default: 0, comment: '厨房数量' })
  kitchenNumber?: number;

  // @Column({ comment: '评论', default: '' })
  // comment!: string;

  @Column({ name: 'comment_count', comment: '评论数', default: 0 })
  commentCount!: number;

  @Column({ name: 'click_count', comment: '点击数', default: 0 })
  clickCount!: number;

  @Column({ name: 'like_count', comment: '点赞数', default: 0 })
  likeCount!: number;

  @Transform((v: User) => v.username, { toPlainOnly: true })
  @ManyToOne(() => User, (user) => user.houses)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Transform((v: City) => v.name, { toPlainOnly: true })
  @ManyToOne(() => City, (city) => city.houses)
  @JoinColumn({ name: 'city_id' })
  city!: City;

  @Transform((v: Subway) => v.name, { toPlainOnly: true })
  @ManyToOne(() => Subway, (subway) => subway.houses)
  @JoinColumn({ name: 'subway_id' })
  subway!: Subway;
}
