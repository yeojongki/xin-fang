import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
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

  @OneToMany(() => House, house => house.user)
  houses!: House[];

  @Exclude()
  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles!: Role[];

  @Expose({ name: 'roles' })
  getRoles(): string[] {
    return this.roles.map(role => role.token);
  }

  @Expose({ name: 'permissions' })
  getPermissions() {
    let permissions: Permission[] = [];
    this.roles.forEach(role => {
      if (role.permissions && role.permissions.length > 0) {
        permissions = permissions.concat(role.permissions);
      }
    });
    return [...new Set(permissions.map(permission => permission.token))];
  }

  // not in db
  permissions!: string[];
}
