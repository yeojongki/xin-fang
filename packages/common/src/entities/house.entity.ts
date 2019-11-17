import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Base } from './base.entity';
import { User } from './user.entity';
import { City } from './city.entity';
import { Subway } from './subway.entity';
import { HouseStatus } from '../constants/house.const';
import { isNotEmpty } from '../utils/is-empty';

@Entity('house')
export class House extends Base {
  @Column({ comment: '标题' })
  title!: string;

  @Column({ comment: '内容详情' })
  content!: string;

  @Expose({ name: 'imgs' })
  get imgs(): string[] {
    return this._imgs ? this._imgs.split(',') : [];
  }

  set imgs(v: string[]) {
    this._imgs = v.length ? v.filter(isNotEmpty).join(',') : '';
  }

  @Exclude()
  @Column({ name: 'imgs', comment: '图片列表', default: '' })
  _imgs!: string;

  // @Expose({ name: 'imgs' })
  // getImgs(): string[] {
  //   return this.imgs.split(',');
  // }

  @Column({ type: 'enum', enum: HouseStatus, default: 0, comment: '状态' })
  status!: number;

  // @Column({ comment: '评论', default: '' })
  // comment!: string;

  @Column({ name: 'comment_count', comment: '评论数', default: 0 })
  commentCount!: number;

  @Column({ name: 'click_count', comment: '点击数', default: 0 })
  clickCount!: number;

  @Column({ name: 'like_count', comment: '点赞数', default: 0 })
  likeCount!: number;

  @ManyToOne(() => User, user => user.houses)
  user!: User;

  @ManyToOne(() => City, city => city.houses)
  @JoinColumn()
  city!: City;

  @ManyToOne(() => Subway, subway => subway.houses)
  @JoinColumn()
  subway!: Subway;
}
