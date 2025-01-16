import {
  Body,
  Controller,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { FlightAdminLoginService } from './flight-admin-login.service';
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
} from './dtos/admin-login.dto';
import { JwtService } from '@nestjs/jwt';
import { FlightAdminLogGuard } from './flight-admin-login.guard';

@Controller('flight-admin-login')
export class FlightAdminLoginController {
  constructor(
    private readonly flightadminloginService: FlightAdminLoginService,
    private readonly jwtService: JwtService,
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
    const user = await this.flightadminloginService.validateLogin(
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid login credentials!');
    }
    const payload = { sub: user.ID, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
      message: 'Successful Login!',
    };
  }

  @Post('logout')
  @UseGuards(FlightAdminLogGuard)
  logout(@Req() req: any): { message: string } {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided.');
    }

    FlightAdminLogGuard.blacklistToken(token);

    return { message: 'Logged out successfully.' };
  }

  @Patch('update-email')
  @UseGuards(FlightAdminLogGuard)
  async updateEmail(@Body('id') id: string, @Body('email') email: string) {
    await this.flightadminloginService.updateEmail(id, email);
    return {
      message: 'Email updated successfully !',
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.flightadminloginService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<string> {
    return this.flightadminloginService.resetPassword(resetPasswordDto);
  }
}
