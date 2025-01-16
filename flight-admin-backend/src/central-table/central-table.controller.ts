import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CentralTableService } from './central-table.service';
import { CreateCTableDTO } from './DTOs/create-ctable.dto';

@Controller('central-table')
export class CentralTableController {
  constructor(private readonly cTableService: CentralTableService) {}

  @Post()
  async create(@Body() createCTableDto: CreateCTableDTO) {
    return this.cTableService.create(createCTableDto);
  }

  @Get()
  async findAll() {
    return this.cTableService.findAll();
  }

  @Get(':UID')
  async findOne(@Param('UID') uid: number) {
    return this.cTableService.findOne(uid);
  }

  @Put(':UID')
  async update(
    @Param('UID') uid: number,
    @Body() updateCTableDto: CreateCTableDTO,
  ) {
    return this.cTableService.update(uid, updateCTableDto);
  }

  @Delete(':UID')
  async delete(@Param('UID') uid: number) {
    return this.cTableService.remove(uid);
  }
}
