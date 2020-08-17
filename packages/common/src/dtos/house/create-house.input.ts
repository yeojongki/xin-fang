import { IsNotEmpty, IsEnum, MaxLength, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { HouseStatus } from '../../constants/house.const';

export class CreateHouseInput {
  @IsNotEmpty()
  @MaxLength(50)
  title!: string;

  @IsNotEmpty()
  @MaxLength(500)
  content!: string;

  @IsNotEmpty()
  @IsArray()
  imgs!: string;

  @IsNotEmpty()
  @Transform((v) => parseInt(v, 10))
  @IsEnum(HouseStatus)
  status!: HouseStatus;

  @IsNotEmpty()
  @Transform((v) => parseInt(v, 10))
  cityId?: number;

  @IsNotEmpty()
  @Transform((v) => parseInt(v, 10))
  subwayId?: number;
}
