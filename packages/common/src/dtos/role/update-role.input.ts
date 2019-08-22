import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseRoleInput } from './base-role.input';

export class UpdateRoleInput extends BaseRoleInput {
  @IsNotEmpty({ message: '角色ID不能为空' })
  id!: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  token?: string;
}
