import { IsNotEmpty, IsOptional, MaxLength, IsEnum, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { HouseStatus } from '../../constants/house.const';

export class UpdateHouseInput {
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number;

  @IsOptional()
  @MaxLength(50)
  title?: string;

  @IsOptional()
  @MaxLength(500)
  content?: string;

  @IsOptional()
  @IsArray()
  imgs?: string[];

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  @IsEnum(HouseStatus)
  status?: HouseStatus;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  cityId?: number;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  subwayId?: number;
}
