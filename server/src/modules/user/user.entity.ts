import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { RoleEntity } from '../role/role.entity';
import { CommonEntity } from '@/common/common.entity';

export enum Gender {
  UNKNOWN,
  MALE,
  FEMALE,
}

@Entity('user')
export class UserEntity extends CommonEntity {
  @Column({ unique: true })
  username: string;

  @Column({ type: 'char', length: 32 })
  password: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  mobile: string;

  @Column('enum', {
    enum: Gender,
    default: 0,
  })
  gender: number;

  @Column({ default: null })
  avatar: string;

  @ManyToMany(type => RoleEntity, roles => roles)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: RoleEntity[];
}
