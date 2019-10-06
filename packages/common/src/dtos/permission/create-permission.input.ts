import { IsNotEmpty } from 'class-validator';
import { BasePermissionInput } from './base-permission.input';

export class CreatePermissionInput extends BasePermissionInput {
  @IsNotEmpty({ message: '权限名称不能为空' })
  name!: string;

  @IsNotEmpty({ message: '权限标识不能为空' })
  token!: string;

  @IsNotEmpty({ message: '权限模块名不能为空' })
  module!: string;
}
