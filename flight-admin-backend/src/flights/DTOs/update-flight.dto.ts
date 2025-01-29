import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightDto } from './create-flight.dto';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateFlightDto extends PartialType(CreateFlightDto) {
  @IsOptional()
  @IsString()
  airline: string;

  @IsOptional()
  @IsString()
  flightNumber: string;

  @IsOptional()
  @IsString()
  departureCity: string;

  @IsOptional()
  @IsString()
  arrivalCity: string;

  @IsOptional()
  @IsDateString()
  departureDate: string;

  @IsOptional()
  @IsDateString()
  arrivalDate: string;

  @IsOptional()
  @IsNumber()
  ticketPrice: number;

  @IsOptional()
  @IsString()
  @IsEnum(['available', 'unavailable'])
  availability: string;
}
