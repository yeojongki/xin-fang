import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity('role')
export class Role extends Base {
  @Column({ comment: '名称', unique: true })
  name!: string;

  @Column({ comment: '标识', unique: true })
  token!: string;

  @Column({ comment: '描述', default: null, nullable: true })
  desc?: string;

  @ManyToMany(() => User, user => user.roles)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users?: User[];
}
