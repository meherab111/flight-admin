import { Module } from '@nestjs/common';
import { FlightAdminLoginService } from './flight-admin-login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CTable } from 'src/central-table/Entities/ctable.entity';
import { FALogin } from './Entities/admin-login.entity';
import { FlightAdminLoginController } from './flight-admin-login.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([CTable, FALogin]),
    JwtModule.register({
      global: true,
      secret: 'helloworld',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [FlightAdminLoginService],
  controllers: [FlightAdminLoginController],
  exports: [FlightAdminLoginService],
})
export class FlightAdminLoginModule {}
