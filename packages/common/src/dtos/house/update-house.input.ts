import { IsNotEmpty, IsOptional, MaxLength, IsEnum, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  HousePostType,
  HouseRentPayType,
  HouseRentType,
  HouseReviewed,
  HouseStatus,
} from '../../constants/house.const';
import { User } from '../../entities';

export class UpdateHouseInput {
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: string;

  @IsOptional()
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @MaxLength(2000)
  content?: string;

  @IsOptional()
  @IsArray()
  imgs?: string[];

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  cityId?: number;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  subwayId?: number;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  @IsEnum(HouseStatus)
  status?: HouseStatus;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  @IsEnum(HousePostType)
  postType?: HousePostType;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  @IsEnum(HouseReviewed)
  reviewed?: HouseReviewed;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  @IsEnum(HouseRentType)
  rentType?: HouseRentType;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  @IsEnum(HouseRentPayType)
  rentPayType?: HouseRentPayType;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  bedroomNumber?: number;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  bathroomNumber?: number;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  livingroomNumber?: number;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  kitchenNumber?: number;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  size?: number;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  price?: number;
}
