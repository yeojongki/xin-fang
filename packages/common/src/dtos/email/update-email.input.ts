import { IsNotEmpty } from 'class-validator';

export class UpdateEmailInput {
  @IsNotEmpty({ message: 'id 不能为空' })
  // 用户 id
  id!: string;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  code!: string;
}
