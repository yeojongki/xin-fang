import { Entity, Column, ManyToMany, JoinTable, Index } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Base } from './base.entity';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Entity('role')
export class Role extends Base {
  @Exclude()
  readonly createdAt!: Date;

  @Exclude()
  readonly updatedAt!: Date;

  @Column({ comment: '名称', unique: true })
  name!: string;

  @Index({ unique: true })
  @Column({ comment: '标识' })
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

  @ManyToMany(() => Permission, permission => permission.roles)
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  permissions?: Permission[];

  @Expose({ name: 'permissions' })
  getPermissions(): string[] {
    return this.permissions ? this.permissions.map(p => p.id) : [];
  }

  static readonly sheetMap = {
    cellsMap: {
      名称: 'name',
      标识: 'token',
      描述: 'desc',
    },
  };
}
