import { Length } from 'class-validator';

export class AuthBaseInput {
  @Length(1, 16, { message: '用户名必须是 1-16 位' })
  username!: string;

  @Length(6, 64, { message: '密码必须是 6-64 位 ' })
  password!: string;
}
