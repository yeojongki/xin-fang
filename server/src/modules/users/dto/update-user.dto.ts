import { BaseUserDto } from './base-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends BaseUserDto {
  @IsNotEmpty({ message: '用户ID不能为空' })
  id: string;
}
