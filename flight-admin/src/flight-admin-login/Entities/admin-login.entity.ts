import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Flight-Admin-Login')
export class FALogin {
  @PrimaryColumn()
  ID: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  reset_token: string;
}
