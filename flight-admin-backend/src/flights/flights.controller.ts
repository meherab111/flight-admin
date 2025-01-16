import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  Patch,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { ToggleAvailabilityDto } from './DTOs/toggle-availability.dto';
import { FlightAdminLogGuard } from 'src/flight-admin-login/flight-admin-login.guard';

@UseGuards(FlightAdminLogGuard)
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post('search')
  async searchFlight(@Body('flightNumber') flightNumber: string) {
    const flights = await this.flightsService.findByFlightNumber(flightNumber);
    if (!flights || flights.length === 0) {
      throw new NotFoundException(
        'No flights found for the provided flight number',
      );
    }
    return flights;
  }

  @Post('filter')
  async filterFlights(@Body() body: { minPrice: number; maxPrice: number }) {
    const { minPrice, maxPrice } = body;

    if (minPrice === undefined || maxPrice === undefined) {
      throw new BadRequestException(
        'Please provide both minPrice and maxPrice.',
      );
    }

    if (minPrice > maxPrice) {
      throw new BadRequestException(
        'minPrice cannot be greater then maxPrice.',
      );
    }

    if (minPrice === maxPrice) {
      throw new BadRequestException(
        'minPrice and maxPrice cannot be the same.',
      );
    }
    return await this.flightsService.filterFlightsByPrice(minPrice, maxPrice);
  }

  @Post()
  addFlight(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.addFlight(createFlightDto);
  }

  @Get()
  getAllFlights() {
    return this.flightsService.getAllFlights();
  }

  @Put(':id')
  updateFlight(
    @Param('id') id: number,
    @Body() toggleAvailabilityDto: ToggleAvailabilityDto,
  ) {
    return this.flightsService.updateFlight(id, toggleAvailabilityDto);
  }

  @Delete(':id')
  async deleteFlight(@Param('id') id: number): Promise<{ message: string }> {
    await this.flightsService.deleteFlight(id);
    return { message: 'Flights Data deleted successfully!' };
  }

  @Patch(':id/toggle-availability')
  async toggleAvailability(
    @Param('id') id: number,
    @Body() toggleAvailabilityDto: ToggleAvailabilityDto,
  ) {
    return this.flightsService.toggleAvailability(
      id,
      toggleAvailabilityDto.availability,
    );
  }
  @Get(':id/availability')
  async getAvailability(@Param('id') id: number) {
    return this.flightsService.getAvailabilityStatus(id);
  }
}
