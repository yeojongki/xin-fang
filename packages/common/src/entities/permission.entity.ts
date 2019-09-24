import { Base } from './base.entity';
import { Entity, Index, Column, ManyToMany, JoinTable } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from './role.entity';

@Entity('permission')
export class Permission extends Base {
  @Exclude()
  readonly createdAt!: Date;

  @Exclude()
  readonly updatedAt!: Date;

  @Index({ unique: true })
  @Column({ comment: '标识' })
  token!: string;

  @Column({ comment: '名称', unique: true })
  name!: string;

  @Column({ comment: '描述', default: null, nullable: true })
  desc?: string;

  @ManyToMany(() => Role, role => role.permissions)
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'permission_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles?: Role[];
}
