import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsModule } from './flights/flights.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Flight } from './flights/entities/flight.entity';
import { CentralTableModule } from './central-table/central-table.module';
import { CTable } from './central-table/Entities/ctable.entity';
import { FlightAdminLoginController } from './flight-admin-login/flight-admin-login.controller';
import { FlightAdminLoginModule } from './flight-admin-login/flight-admin-login.module';
import { FALogin } from './flight-admin-login/Entities/admin-login.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 9999,
      username: 'postgres',
      password: '12345',
      database: 'myFlightDb',
      entities: [Flight, CTable, FALogin],
      synchronize: true,
    }),
    FlightsModule,
    CentralTableModule,
    FlightAdminLoginModule,
  ],
  controllers: [AppController, FlightAdminLoginController],
  providers: [AppService],
})
export class AppModule {}
