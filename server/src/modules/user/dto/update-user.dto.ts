import { IsNotEmpty, ValidateIf } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @IsNotEmpty({ message: '用户ID不能为空' })
  id: string;

  @ValidateIf((o: object) => o.hasOwnProperty('password'))
  password: string;

  @ValidateIf((o: object) => o.hasOwnProperty('username'))
  username: string;
}
