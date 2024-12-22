import { Test, TestingModule } from '@nestjs/testing';
import { CentralTableService } from './central-table.service';

describe('CentralTableService', () => {
  let service: CentralTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CentralTableService],
    }).compile();

    service = module.get<CentralTableService>(CentralTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
