import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Post,
  Query,
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
import { FALogin } from './Entities/admin-login.entity';

@Controller('flight-admin-login')
export class FlightAdminLoginController {
  constructor(
    private readonly flightAdminLoginService: FlightAdminLoginService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('migrate')
  async migrate() {
    await this.flightAdminLoginService.migrateData();
    return {
      success: true,
      message: 'Data Migration Completed Successfully.',
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.flightAdminLoginService.validateLogin(
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
  async updateEmail(@Body('id') id: string, @Body('email') email: string, @Req() req) {
    if (req.user.sub !== id) {
      throw new UnauthorizedException('You are not authorized to update this email.');
    }

    await this.flightAdminLoginService.updateEmail(id, email);
    return {
      message: 'Email updated successfully!',
    };
  }

  @Post('admin-info')
  @UseGuards(FlightAdminLogGuard)
  async getAdminInfo(@Body('id') id: string, @Req() req): Promise<FALogin> {
    if (req.user.sub !== id) {
      throw new UnauthorizedException('You are not authorized to access this information.');
    }

    const admin = await this.flightAdminLoginService.getAdminInfo(id);
    if (!admin) {
      throw new NotFoundException('Admin not found.');
    }
    return admin;
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.flightAdminLoginService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<string> {
    return this.flightAdminLoginService.resetPassword(resetPasswordDto);
  }

  @Post('validate-reset-token')
  async validateResetToken(
    @Body('token') token: string,
  ): Promise<{ isValid: boolean }> {
    return this.flightAdminLoginService.validateResetToken(token);
  }
}
