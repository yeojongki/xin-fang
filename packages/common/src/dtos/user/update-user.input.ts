import {
  IsOptional,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  ValidateIf,
  Length,
  IsMobilePhone,
} from 'class-validator';
import {
  MAX_LENGTH_MOBILE,
  MAX_LENGTH_EMAIL,
  MAX_LENGTH_USERNAME,
  ENCODED_PASSWORD_LENGTH,
} from '@xf/common/src/constants/validation.const';
import { Gender } from '@xf/common/src/constants/gender.const';
import { Role } from '@xf/common/src/entities/role.entity';
import { AuthBaseInput } from '../auth/auth-base.input';

export class UpdateUserInput extends AuthBaseInput {
  @IsNotEmpty({ message: '用户ID不能为空' })
  id!: string;

  @IsOptional()
  @Length(1, MAX_LENGTH_USERNAME)
  username!: string;

  @IsOptional()
  @Length(ENCODED_PASSWORD_LENGTH, ENCODED_PASSWORD_LENGTH)
  password!: string;

  @IsOptional()
  @MaxLength(MAX_LENGTH_MOBILE)
  @IsMobilePhone('zh-CN')
  mobile?: string;

  @IsOptional()
  @MaxLength(MAX_LENGTH_EMAIL)
  @ValidateIf(o => o.email)
  @IsEmail()
  email?: string;

  @IsOptional()
  avatar?: string;

  // todo custom validation https://github.com/typestack/class-validator#custom-validation-decorators
  gender?: Gender;

  roles?: Role[];
}
