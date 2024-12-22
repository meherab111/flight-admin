import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateFlightDto {
  @IsString()
  airline: string;

  @IsString()
  flightNumber: string;

  @IsString()
  departureCity: string;

  @IsString()
  arrivalCity: string;

  @IsDateString()
  departureDate: string;

  @IsDateString()
  arrivalDate: string;

  @IsNumber()
  ticketPrice: number;

  @IsString()
  @IsEnum(['available', 'unavailable'])
  availability: string;
}
