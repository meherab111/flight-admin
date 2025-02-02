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
      secret: 's>myRb69oSecretPnYP4Kv0_!_Q8NgPLH7KEY_0_/3gJQ9H+dUcN7965DlU++p',
      signOptions: { expiresIn: '6h' },
    }),
  ],
  providers: [FlightAdminLoginService],
  controllers: [FlightAdminLoginController],
  exports: [FlightAdminLoginService],
})
export class FlightAdminLoginModule {}
