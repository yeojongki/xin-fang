import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Gender } from '@xf/common/src/constants/gender.const';
import { Base } from './base.entity';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { House } from './house.entity';

@Entity('user')
export class User extends Base {
  @Column({ unique: true })
  username!: string;

  @Exclude()
  @Column({ type: 'char', length: 32 })
  password!: string;

  @Column({ default: null, unique: true })
  email?: string;

  @Column({ default: 0 })
  emailVerified?: number;

  @Column({ default: null, unique: true })
  mobile?: string;

  @Column({ default: 0 })
  mobileVerified?: number;

  @Column('enum', {
    enum: Gender,
    default: 0,
  })
  gender?: number;

  @Transform((v) => v || 'logo.png')
  @Column({ default: null })
  avatar?: string;

  @Column({ name: 'self_desc', default: null, comment: '自我介绍' })
  selfDesc?: string;

  @Column({ name: 'wechat', default: null, comment: '微信号' })
  wechat?: string;

  @OneToMany(() => House, (house) => house.user)
  houses!: House[];

  @Exclude()
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles!: Role[];

  @Expose({ name: 'roles' })
  getRoles(): string[] {
    if (this.roles && Array.isArray(this.roles)) {
      return this.roles.map((role) => role.token);
    }
    return [];
  }

  @Expose({ name: 'permissions' })
  getPermissions() {
    if (!this.roles || !this.roles.length) return [];
    let permissions: Permission[] = [];
    this.roles.forEach((role) => {
      if (role.permissions && role.permissions.length > 0) {
        permissions = permissions.concat(role.permissions);
      }
    });
    return [...new Set(permissions.map((permission) => permission.token))];
  }

  // not in db
  permissions!: string[];
}
