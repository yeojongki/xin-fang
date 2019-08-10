import { BaseUserDto } from './base-user.dto';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { MAX_LENGTH_PASSWORD } from '@/constants/validate.const';
import { genMsgOfLength } from '@/utils/genValidateMsg';

export class CreateUserDto extends BaseUserDto {
  @IsNotEmpty({ message: '密码不能为空' })
  @MaxLength(MAX_LENGTH_PASSWORD, genMsgOfLength('密码', MAX_LENGTH_PASSWORD))
  password: string;
}
