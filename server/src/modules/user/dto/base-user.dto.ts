import { IsNotEmpty, MaxLength, IsEmail, ValidateIf } from 'class-validator';
import { Gender } from '../user.entity';
import { RoleEntity } from '@/modules/role/role.entity';
import {
  MAX_LENGTH_MOBILE,
  MAX_LENGTH_EMAIL,
  MAX_LENGTH_USERNAME,
} from '@/constants/validate.const';
import { genMsgOfLength } from '@/utils/genValidateMsg';

export class UsernameDto {
  @MaxLength(MAX_LENGTH_USERNAME, genMsgOfLength('用户名', MAX_LENGTH_USERNAME))
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;
}

export class BaseUserDto extends UsernameDto {
  @MaxLength(MAX_LENGTH_MOBILE, genMsgOfLength('手机号', MAX_LENGTH_MOBILE))
  mobile: string = '';

  @MaxLength(MAX_LENGTH_EMAIL, genMsgOfLength('邮箱', MAX_LENGTH_EMAIL))
  @ValidateIf(o => o.email !== '')
  @IsEmail({ allow_utf8_local_part: false }, { message: '邮箱格式不正确' })
  email: string = '';

  avatar: string;
  gender: Gender;
  roles: RoleEntity[];
}
