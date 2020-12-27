import { IsNotEmpty, IsEnum, MaxLength, IsOptional, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  HousePostType,
  HouseRentPayType,
  HouseRentType,
  HouseReviewed,
  HouseStatus,
} from '../../constants/house.const';

export class CreateHouseInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  content!: string;

  @IsNotEmpty()
  @IsString()
  imgs!: string;

  @IsNotEmpty()
  @Transform((v) => parseInt(v, 10))
  cityId?: number;

  @IsNotEmpty()
  @Transform((v) => parseInt(v, 10))
  subwayId?: number;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  tid?: number;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  @IsEnum(HouseStatus)
  status?: HouseStatus;

  @IsOptional()
  @IsEnum(HousePostType)
  postType?: HousePostType;

  @IsOptional()
  @IsEnum(HouseReviewed)
  reviewed?: HouseReviewed;

  @IsOptional()
  @IsEnum(HouseRentType)
  rentType?: HouseRentType;

  @IsOptional()
  @IsEnum(HouseRentPayType)
  rentPayType?: HouseRentPayType;

  @IsOptional()
  @IsNumber()
  bedroomNumber?: number;

  @IsOptional()
  @IsNumber()
  bathroomNumber?: number;

  @IsOptional()
  @IsNumber()
  livingroomNumber?: number;

  @IsOptional()
  @IsNumber()
  kitchenNumber?: number;
}
