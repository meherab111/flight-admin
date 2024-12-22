import { Test, TestingModule } from '@nestjs/testing';
import { CentralTableController } from './central-table.controller';

describe('CentralTableController', () => {
  let controller: CentralTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentralTableController],
    }).compile();

    controller = module.get<CentralTableController>(CentralTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
