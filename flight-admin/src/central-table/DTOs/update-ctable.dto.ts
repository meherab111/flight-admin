import {
  IsBoolean,
  IsEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCTableDTO {
  @IsOptional()
  @IsString()
  user_type: string;

  @IsOptional()
  @IsBoolean()
  is_admin: boolean;

  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @IsEmpty()
  phone_number?: string;

  @IsOptional()
  @IsString()
  @IsEmpty()
  address?: string;

  @IsOptional()
  @IsString()
  roomType: string;

  @IsOptional()
  @IsNumber()
  numberOfpeople: number;

  @IsOptional()
  @IsString()
  checkInDate: string;

  @IsOptional()
  @IsString()
  checkOutDate: string;

  @IsOptional()
  @IsString()
  flightName: string;

  @IsOptional()
  @IsString()
  AirlineName: string;

  @IsOptional()
  @IsString()
  FromPlace: string;

  @IsOptional()
  @IsString()
  ToPlace: string;

  @IsOptional()
  @IsNumber()
  Price: number;

  @IsOptional()
  @IsString()
  Availability: string;

  @IsOptional()
  @IsString()
  carModel: string;

  @IsOptional()
  @IsString()
  carNumber: string;

  @IsOptional()
  @IsString()
  pickUpDate: string;

  @IsOptional()
  @IsString()
  dropOffDate: string;
}
