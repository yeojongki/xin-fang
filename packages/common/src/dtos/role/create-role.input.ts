import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseRoleInput } from './base-role.input';

export class CreateRoleInput extends BaseRoleInput {
  @IsNotEmpty({ message: '角色名称不能为空' })
  name!: string;

  @IsNotEmpty({ message: '角色标识不能为空' })
  token!: string;

  @IsOptional()
  permissions?: string[];
}
