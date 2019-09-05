import { IsOptional, IsNotEmpty, MaxLength, IsEmail, ValidateIf } from 'class-validator';
import { MAX_LENGTH_MOBILE, MAX_LENGTH_EMAIL } from '@xf/common/src/constants/validation.const';
import { Gender } from '@xf/common/src/constants/gender.const';
import { Role } from '@xf/common/src/entities/role.entity';
import { AuthBaseInput } from '../auth/auth-base.input';

export class UpdateUserInput extends AuthBaseInput {
  @IsNotEmpty({ message: '用户ID不能为空' })
  id!: string;

  @IsOptional()
  username!: string;

  @IsOptional()
  password!: string;

  @IsOptional()
  @MaxLength(MAX_LENGTH_MOBILE, { message: `手机号最多为${MAX_LENGTH_MOBILE}位` })
  mobile?: string;

  @MaxLength(MAX_LENGTH_EMAIL, { message: `邮箱最多为${MAX_LENGTH_EMAIL}位` })
  @ValidateIf(o => !o.email)
  @IsEmail({ allow_utf8_local_part: false }, { message: '邮箱格式不正确' })
  email?: string;

  @IsOptional()
  avatar?: string;

  // todo custom validation https://github.com/typestack/class-validator#custom-validation-decorators
  gender?: Gender;

  roles?: Role[];
}
