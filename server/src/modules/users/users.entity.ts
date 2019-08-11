import {
  Entity,
  Column,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as crypto from 'crypto';
import { RolesEntity } from '../roles/roles.entity';
import { CommonEntity } from '@/common/common.entity';

export enum Gender {
  UNKNOWN,
  MALE,
  FEMALE,
}

@Entity('user')
export class UsersEntity extends CommonEntity {
  @Column({ unique: true })
  username: string;

  @Column({ type: 'char', length: 32 })
  password: string;

  // @BeforeInsert()
  // hashPassword() {
  //   this.password = crypto
  //     .createHash('md5')
  //     .update(this.password)
  //     .digest('hex');
  // }

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

  @ManyToMany(type => RolesEntity, roles => roles)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: RolesEntity[];
}
