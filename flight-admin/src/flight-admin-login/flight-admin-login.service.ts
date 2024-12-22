import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CTable } from 'src/central-table/Entities/ctable.entity';
import { Like, Repository } from 'typeorm';
import { FALogin } from './Entities/admin-login.entity';

@Injectable()
export class FlightAdminLoginService {
  constructor(
    @InjectRepository(CTable)
    private readonly cTableRepo: Repository<CTable>,

    @InjectRepository(FALogin)
    private readonly loginRepo: Repository<FALogin>,
  ) {}

  async migrateData(): Promise<void> {
    // Fetch data from CTable where ID starts with "FA-"
    const cTableData = await this.cTableRepo.find({
      where: { ID: Like('FA-%') }, // Ensure this is the correct pattern
    });

    if (cTableData.length === 0) {
      console.log('No Records Found Matching The Criteria.');
      return;
    }

    // Ensure the ID is not null and is correctly mapped
    const loginData = cTableData.map((record) => {
      if (!record.ID) {
        console.log(`Missing ID for record: ${JSON.stringify(record)}`);
        throw new Error('ID is missing from the CTable record');
      }

      return {
        ID: record.ID, // Ensure this is populated
        username: record.username,
        email: record.email,
        password: record.password,
        reset_token: null, // Set as null for now
      };
    });

    // Insert into the HotelAdmin_LogIn table
    await this.loginRepo.save(loginData);
    console.log('Data migration completed.');
  }

  // Method to validate login credentials
  async validateLogin(username: string, password: string): Promise<boolean> {
    const user = await this.loginRepo.findOne({
      where: { username, password },
    });
    return !!user; // Returns true if user is found, otherwise false
  }

  async updateEmail(id: string, newEmail: string): Promise<void> {
    // 1. Update email in FALogin
    const adminLogin = await this.loginRepo.findOne({ where: { ID: id } });
    if (!adminLogin) {
      throw new NotFoundException(
        'Admin with the given ID not found in Flight-Admin-Login',
      );
    }

    adminLogin.email = newEmail;
    await this.loginRepo.save(adminLogin);

    // 2. Sync email in CTable
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
