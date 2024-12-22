import {
  Body,
  Controller,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { FlightAdminLoginService } from './flight-admin-login.service';
import { LoginDto } from './dtos/admin-login.dto';

@Controller('flight-admin-login')
export class FlightAdminLoginController {
  constructor(
    private readonly flightadminloginService: FlightAdminLoginService,
  ) {}

  @Post('migrate')
  async migrate() {
    await this.flightadminloginService.migrateData();
    return {
      success: true,
      message: 'Data Migration Completed Successfully.',
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    const isValid = await this.flightadminloginService.validateLogin(
      username,
      password,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid login credentials!');
    }

    return {
      message: 'Successful Login!',
    };
  }

  @Patch('update-email')
  async updateEmail(@Body('id') id: string, @Body('email') email: string) {
    await this.flightadminloginService.updateEmail(id, email);
    return {
      message: 'Email updated successfully !',
    };
  }
}
