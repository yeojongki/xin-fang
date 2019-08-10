import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity('role')
export class RolesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: '名称', unique: true })
  name: string;

  @Column({ comment: '标识', unique: true })
  token: string;

  @Column({ comment: '描述', default: null, nullable: true })
  desc: string;

  @ManyToMany(type => UsersEntity, user => user.roles)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: UsersEntity;
}
