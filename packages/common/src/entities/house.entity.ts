import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Base } from './base.entity';
import { User } from './user.entity';
import { City } from './city.entity';
import { Subway } from './subway.entity';
import {
  HouseRentPayType,
  HouseRentType,
  HouseReviewed,
  HouseStatus,
} from '../constants/house.const';
import { isNotEmpty } from '../utils/is-empty';

@Entity('house')
export class House extends Base {
  @Column({ comment: '标题' })
  title!: string;

  @Column({ default: '', comment: '内容详情' })
  content!: string;

  @Column({
    comment: '图片列表',
    default: '',
    transformer: {
      from: (v) => (typeof v.split === 'function' ? v.split(',') : []),
      to: (v) => (v.length ? v.filter(isNotEmpty).join(',') : ''),
    },
  })
  imgs!: string;

  @Column({
    type: 'enum',
    enum: HouseStatus,
    default: HouseStatus.OFF,
    comment: '房子状态(上架中0/已下架1)',
  })
  status!: number;

  @Column({
    type: 'enum',
    enum: HouseReviewed,
    default: HouseReviewed.NO,
    comment: '审核状态(未审核0/已审核1)',
  })
  reviewed!: number;

  @Column({ comment: '房租' })
  rent!: number;

  @Column({
    type: 'enum',
    enum: HouseRentType,
    default: HouseRentType.ALL,
    comment: '出租类型(整租0/合租1)',
  })
  rentType!: number;

  @Column({
    type: 'enum',
    enum: HouseRentPayType,
    default: HouseRentPayType.MONTH,
    comment: '出租支付类型(月付0/季付1/天付2/年付3/面议4)',
  })
  rentPayType!: number;

  // @Column({ comment: '评论', default: '' })
  // comment!: string;

  @Column({ name: 'comment_count', comment: '评论数', default: 0 })
  commentCount!: number;

  @Column({ name: 'click_count', comment: '点击数', default: 0 })
  clickCount!: number;

  @Column({ name: 'like_count', comment: '点赞数', default: 0 })
  likeCount!: number;

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => User, (user) => user.houses)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Expose({ name: 'author' })
  getAuthor() {
    return this.user.username;
  }

  @ManyToOne(() => City, (city) => city.houses)
  @JoinColumn({ name: 'city_id' })
  city!: City;

  @ManyToOne(() => Subway, (subway) => subway.houses)
  @JoinColumn({ name: 'subway_id' })
  subway!: Subway;
}
