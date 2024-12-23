import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CTable } from 'src/central-table/Entities/ctable.entity';
import { Like, Repository } from 'typeorm';
import { FALogin } from './Entities/admin-login.entity';

@Injectable()
export class FlightAdminLoginService {
  private blacklistedTokens: Set<string> = new Set();
  constructor(
    @InjectRepository(CTable)
    private readonly cTableRepo: Repository<CTable>,

    @InjectRepository(FALogin)
    private readonly loginRepo: Repository<FALogin>,
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
}
