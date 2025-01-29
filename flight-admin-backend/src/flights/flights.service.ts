import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { UpdateFlightDto } from './dtos/update-flight.dto';
import { AvailabilityStatus } from './DTOs/toggle-availability.dto';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
  ) {}

  async addFlight(createFlightDto: CreateFlightDto): Promise<Flight> {
    const newFlight = this.flightRepository.create(createFlightDto);
    return this.flightRepository.save(newFlight);
  }

  async getAllFlights(): Promise<Flight[]> {
    return this.flightRepository.find();
  }

  async getFlightStatistics() {
    const totalFlights = await this.flightRepository.count();
    const availableFlights = await this.flightRepository.count({ where: { availability: 'available' } });

    return { totalFlights, availableFlights };
  }

  async findByFlightNumber(flightNumber: string): Promise<Flight[]> {
    return await this.flightRepository
      .createQueryBuilder('flight')
      .where('flight.flightNumber = :flightNumber', { flightNumber })
      .getMany();
  }

  async updateFlight(
    id: number,
    updateFlightDto: UpdateFlightDto,
  ): Promise<Flight> {
    await this.flightRepository.update(id, updateFlightDto);
    return this.flightRepository.findOneBy({ id });
  }


  async deleteFlight(id: number): Promise<void> {
    const result = await this.flightRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Flight not found');
    }
  }

  async toggleAvailability(
    id: number,
    availability: AvailabilityStatus,
  ): Promise<Flight> {
    const flight = await this.flightRepository.findOneBy({ id });

    if (!flight) {
      throw new NotFoundException(`Flight with ID ${id} is not found`);
    }
    flight.availability = availability;
    return this.flightRepository.save(flight);
  }

  async getAvailabilityStatus(id: number): Promise<{ availability: string }> {
    const flight = await this.flightRepository.findOneBy({ id });

    if (!flight) {
      throw new NotFoundException(`Flight with ID ${id} is not found`);
    }
    return { availability: flight.availability };
  }

  async filterFlightsByPrice(
    minPrice: number,
    maxPrice: number,
  ): Promise<any[]> {
    const flights = await this.flightRepository.find({
      where: {
        ticketPrice: Between(minPrice, maxPrice),
      },
    });
    if (!flights.length) {
      throw new NotFoundException('No flights found in the given price range.');
    }
    return flights;
  }
}
