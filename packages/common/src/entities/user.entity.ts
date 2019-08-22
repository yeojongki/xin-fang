import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Gender } from '@xf/common/constants/gender.const';
import { Base } from './base.entity';
import { Role } from './role.entity';

@Entity('user')
export class User extends Base {
  @Column({ unique: true })
  username!: string;

  @Column({ type: 'char', length: 32 })
  password!: string;

  @Column({ default: null })
  email?: string;

  @Column({ default: null })
  mobile?: string;

  @Column('enum', {
    enum: Gender,
    default: 0,
  })
  gender?: number;

  @Column({ default: null })
  avatar?: string;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles?: Role[];
}
