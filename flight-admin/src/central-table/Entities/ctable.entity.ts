import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('CTable')
export class CTable {
  @PrimaryGeneratedColumn()
  UID: number;

  @PrimaryColumn()
  ID: string;

  @Column()
  user_type: string;

  @Column({ default: false })
  is_admin: boolean;

  @Column()
  fullname: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  roomType: string;

  @Column({ nullable: true })
  numberOfpeople: number;

  @Column('date', { nullable: true })
  checkInDate: string;

  @Column('date', { nullable: true })
  checkOutDate: string;

  @Column({ nullable: true })
  flightName: string;

  @Column({ nullable: true })
  AirlineName: string;

  @Column({ nullable: true })
  FromPlace: string;

  @Column({ nullable: true })
  ToPlace: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  Price: number;

  @Column({ nullable: true })
  Availability: string;

  @Column({ nullable: true })
  carModel: string;

  @Column({ nullable: true })
  carNumber: string;

  @Column('date', { nullable: true })
  pickUpDate: string;

  @Column('date', { nullable: true })
  dropOffDate: string;

  @Column({ default: 'Pending', nullable: true })
  paymentStatus: string;

  @Column({ default: 'Active', nullable: true })
  bookingStatus: string;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
