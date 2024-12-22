import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CTable } from './Entities/ctable.entity';
import { CreateCTableDTO } from './DTOs/create-ctable.dto';
import { UpdateCTableDTO } from './DTOs/update-ctable.dto';
import { FALogin } from 'src/flight-admin-login/Entities/admin-login.entity';

@Injectable()
export class CentralTableService {
  constructor(
    @InjectRepository(CTable)
    private readonly cTableRepo: Repository<CTable>,
    @InjectRepository(FALogin)
    private readonly loginRepo: Repository<FALogin>,
  ) {}

  private async generateId(user_type: string): Promise<string> {
    const prefix = this.getIDPrefix(user_type);

    const lastEntry = await this.cTableRepo
      .createQueryBuilder('ctable')
      .where('ctable.ID LIKE :prefix', { prefix: `${prefix}-%` })
      .orderBy('ctable.ID', 'DESC')
      .limit(1)
      .getOne();

    const nextIdNumber = lastEntry
      ? parseInt(lastEntry.ID.split('-')[1], 10) + 1
      : 101;

    return `${prefix}-${nextIdNumber}`;
  }

  private getIDPrefix(user_type: string): string {
    switch (user_type) {
      case 'Hotel':
        return 'HA';
      case 'Flight':
        return 'FA';
      case 'Car':
        return 'CA';
      case 'User':
        return 'U';
      default:
        throw new Error('Invalid user_type');
    }
  }

  async create(createCTableDto: CreateCTableDTO): Promise<CTable> {
    const ID = await this.generateId(createCTableDto.user_type);
    const newCTable = this.cTableRepo.create({ ...createCTableDto, ID });
    const savedCTable = await this.cTableRepo.save(newCTable);

    // Automatically add to login table if user_type is 'Flight' and is_admin is true
    if (
      createCTableDto.user_type === 'Flight' &&
      createCTableDto.is_admin === true
    ) {
      await this.addToLoginTable(savedCTable);
    }

    return savedCTable;
  }

  private async addToLoginTable(ctable: CTable): Promise<void> {
    // Ensure the required fields are present
    if (!ctable.username || !ctable.password || !ctable.email || !ctable.ID) {
      throw new Error('Missing required fields for login record');
    }

    const loginRecord = this.loginRepo.create({
      ID: ctable.ID, // Use the same ID from CTable
      username: ctable.username,
      password: ctable.password,
      email: ctable.email,
      reset_token: null, // Set token to null or generate one if needed
    });

    await this.loginRepo.save(loginRecord);
  }

  async findAll(): Promise<CTable[]> {
    return this.cTableRepo.find();
  }

  async findOne(UID: number): Promise<CTable> {
    const ctable = await this.cTableRepo.findOne({ where: { UID } });
    if (!ctable) {
      throw new NotFoundException(`CTable with UID ${UID} not found`);
    }
    return ctable;
  }

  async update(UID: number, updateCTableDto: UpdateCTableDTO): Promise<CTable> {
    const ctable = await this.findOne(UID);
    Object.assign(ctable, updateCTableDto);
    return this.cTableRepo.save(ctable);
  }

  async remove(UID: number): Promise<void> {
    const result = await this.cTableRepo.delete({ UID });
    if (result.affected === 0) {
      throw new NotFoundException(`CTable with UID ${UID} not found`);
    }
  }
}
