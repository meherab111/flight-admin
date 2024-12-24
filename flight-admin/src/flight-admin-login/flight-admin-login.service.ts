import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CTable } from 'src/central-table/Entities/ctable.entity';
import { Like, Repository } from 'typeorm';
import { FALogin } from './Entities/admin-login.entity';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { ForgotPasswordDto, ResetPasswordDto } from './dtos/admin-login.dto';

@Injectable()
export class FlightAdminLoginService {
  private blacklistedTokens: Set<string> = new Set();
  constructor(
    @InjectRepository(CTable)
    private readonly cTableRepo: Repository<CTable>,
    @InjectRepository(FALogin)
    private readonly loginRepo: Repository<FALogin>,
    private readonly jwtService: JwtService,
  ) {}

  async migrateData(): Promise<void> {
    const cTableData = await this.cTableRepo.find({
      where: { ID: Like('FA-%') },
    });

    if (cTableData.length === 0) {
      console.log('No Records Found Matching The Criteria.');
      return;
    }

    const loginData = cTableData.map((record) => {
      if (!record.ID) {
        console.log(`Missing ID for record: ${JSON.stringify(record)}`);
        throw new Error('ID is missing from the CTable record');
      }

      return {
        ID: record.ID,
        username: record.username,
        email: record.email,
        password: record.password,
        reset_token: null,
      };
    });

    await this.loginRepo.save(loginData);
    console.log('Data migration completed.');
  }

  async validateLogin(username: string, password: string): Promise<FALogin> {
    const user = await this.loginRepo.findOne({
      where: { username, password },
    });
    return user;
  }

  async logout(token: string): Promise<{ message: string }> {
    this.blacklistedTokens.add(token);
    return { message: 'Logged out successfully' };
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.blacklistedTokens.has(token);
  }

  async updateEmail(id: string, newEmail: string): Promise<void> {
    const adminLogin = await this.loginRepo.findOne({ where: { ID: id } });
    if (!adminLogin) {
      throw new NotFoundException(
        'Admin with the given ID not found in Flight-Admin-Login',
      );
    }

    adminLogin.email = newEmail;
    await this.loginRepo.save(adminLogin);

    const centralRecord = await this.cTableRepo.findOne({ where: { ID: id } });
    if (!centralRecord) {
      throw new NotFoundException(
        'Record with the given ID not found in CTable',
      );
    }

    centralRecord.email = newEmail;
    await this.cTableRepo.save(centralRecord);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<string> {
    const { email } = forgotPasswordDto;
    const user = await this.loginRepo.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const token = this.jwtService.sign(
      { id: user.ID, email: user.email },
      {
        secret:
          's>myRb69oSecretPnYP4Kv0_!_Q8NgPLH7KEY_0_/3gJQ9H+dUcN7965DlU++p',
        expiresIn: '24h',
      },
    );

    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await this.loginRepo.save(user);

    await this.sendResetEmail(email, token);

    return `Reset token sent to ${email}`;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<string> {
    const { token, newPassword } = resetPasswordDto;

    const user = await this.loginRepo.findOne({ where: { resetToken: token } });

    if (!user || new Date(user.resetTokenExpiry) < new Date()) {
      throw new BadRequestException('Invalid or expired reset token.');
    }

    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await this.loginRepo.save(user);

    const centralRecord = await this.cTableRepo.findOne({
      where: { ID: user.ID },
    });
    if (!centralRecord) {
      throw new NotFoundException(
        'Corresponding user not found in Central Table.',
      );
    }

    centralRecord.password = newPassword;
    await this.cTableRepo.save(centralRecord);

    return 'Password reset successfully.';
  }

  private async sendResetEmail(email: string, token: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nazibvai123@gmail.com',
        pass: 'rgfp qmje bvxf iuwj',
      },
    });

    const sentToken = token;

    const mailOptions = {
      from: 'nazibvai123@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h2>Forgot Password ? Don't Worry.</h2>
        <h3>This is the Token for Reset your Password: "<span style="color:green;">${sentToken}</span>"</h3>
        <h3>---Thank you---</h3>
      `,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.log('Error sending email: ', error);
    }
  }
}
