import { IsNotEmpty, MinLength } from 'class-validator';
import { BaseUserDto } from '../../user/dto/base-user.dto';
import { MIN_LENGTH_PASSWORD } from '@/constants/validate.const';
import { genMsgOfLength } from '@/utils/genValidateMsg';

export class LoginUserDto extends BaseUserDto {
  @IsNotEmpty()
  @MinLength(
    MIN_LENGTH_PASSWORD,
    genMsgOfLength('密码', MIN_LENGTH_PASSWORD, false),
  )
  readonly password: string;
}
