import { IsOptional } from 'class-validator';
import { Role } from '@xf/common/entities/role.entity';
import { AuthBaseInput } from '../auth/auth-base.input';

export class CreateUserInput extends AuthBaseInput {
  @IsOptional()
  roles?: Role[];
}
