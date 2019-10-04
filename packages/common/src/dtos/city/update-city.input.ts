import { IsNotEmpty, IsIn } from 'class-validator';

export class UpdateCityInput {
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number;

  @IsIn([0, 1])
  status!: number;
}
