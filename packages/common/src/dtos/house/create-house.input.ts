import { IsNotEmpty, IsOptional, IsEnum, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { HouseStatus } from '../../constants/house.const';

export class CreateHouseInput {
  @IsNotEmpty()
  @MaxLength(50)
  title!: string;

  @IsNotEmpty()
  @MaxLength(500)
  content!: string;

  @IsOptional()
  imgs!: string;

  @IsNotEmpty()
  @Transform(v => parseInt(v, 10))
  @IsEnum(HouseStatus)
  status!: HouseStatus;
}
