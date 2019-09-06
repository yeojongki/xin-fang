import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Gender } from '@xf/common/src/constants/gender.const';
import { Base } from './base.entity';
import { Role } from './role.entity';

@Entity('user')
export class User extends Base {
  @Column({ unique: true })
  username!: string;

  @Exclude()
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

  @Exclude()
  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  _roles!: Role[];

  @Expose({ name: 'roles' })
  getRoles() {
    return this._roles.map(role => role.token);
  }
}
