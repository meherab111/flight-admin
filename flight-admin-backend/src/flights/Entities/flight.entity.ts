import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  airline: string;

  @Column({ type: 'varchar', length: 255 })
  flightNumber: string;

  @Column({ type: 'varchar', length: 255 })
  departureCity: string;

  @Column({ type: 'varchar', length: 255 })
  arrivalCity: string;

  @Column({ type: 'timestamp' })
  departureDate: Date;

  @Column({ type: 'timestamp' })
  arrivalDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  ticketPrice: number;

  @Column({
    type: 'enum',
    enum: ['available', 'unavailable'],
    default: 'available',
  })
  availability: string;
  length: number;
}
