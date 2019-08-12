import { IsNotEmpty, ValidateIf } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends CreateRoleDto {
  @IsNotEmpty({ message: '角色ID不能为空' })
  id: string;

  @ValidateIf((o: Object) => o.hasOwnProperty('name'))
  name: string;

  @ValidateIf((o: Object) => o.hasOwnProperty('token'))
  token: string;
}
