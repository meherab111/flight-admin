import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { ToggleAvailabilityDto } from './DTOs/toggle-availability.dto';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get('search')
  async searchFlight(@Query('flightNumber') flightNumber: string) {
    const flight = await this.flightsService.findByFlightNumber(flightNumber);
    if (!flight) {
      throw new NotFoundException('Invalid Flight Number!');
    }
    return flight;
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

  @Patch(':id/toggle-availability') // Make sure this decorator is present
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
