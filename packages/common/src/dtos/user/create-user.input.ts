import { IsOptional } from 'class-validator';
import { AuthBaseInput } from '../auth/auth-base.input';

export class CreateUserInput extends AuthBaseInput {
  @IsOptional()
  roles?: string[];
}
