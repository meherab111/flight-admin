import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Flight-Admin-Login')
export class FALogin {
  @PrimaryColumn()
  ID: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpiry: Date;
}
