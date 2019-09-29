import { IsNotEmpty, IsOptional } from 'class-validator';
import { BasePermissionInput } from './base-permission.input';

export class UpdatePermissionInput extends BasePermissionInput {
  @IsNotEmpty({ message: '权限ID不能为空' })
  id!: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  token?: string;
}
