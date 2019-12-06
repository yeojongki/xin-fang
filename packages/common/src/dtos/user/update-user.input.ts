import {
  IsOptional,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  ValidateIf,
  Length,
  IsEnum,
  Allow,
  Matches,
} from 'class-validator';
import {
  MAX_LENGTH_MOBILE,
  MAX_LENGTH_EMAIL,
  MAX_LENGTH_USERNAME,
  ENCODED_PASSWORD_LENGTH,
  MOBILE_REG,
} from '@xf/common/src/constants/validation.const';
import { Gender } from '@xf/common/src/constants/gender.const';
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
  @ValidateIf(o => o.mobile)
  // @IsMobilePhone('zh-CN')
  @Matches(MOBILE_REG)
  mobile?: string;

  @IsOptional()
  @MaxLength(MAX_LENGTH_EMAIL)
  @ValidateIf(o => o.email)
  @IsEmail()
  email?: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  selfDesc?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @Allow()
  roles?: string[];
}
