import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class UpdateHouseInput {
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number;

  @IsOptional()
  @MaxLength(50)
  title!: number;

  @IsOptional()
  content!: string;
}
