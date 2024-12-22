import { IsEnum, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export enum AvailabilityStatus {
  AVAILABLE = 'available',
  NOT_AVAILABLE = 'unavailable',
}

export class ToggleAvailabilityDto {
  @IsEnum(AvailabilityStatus)
  @IsNotEmpty()
  @Transform(({ value }) => {
    // Convert any input to lowercase
    return typeof value === 'string' ? value.toLowerCase() : value;
  })
  availability: AvailabilityStatus;
}
