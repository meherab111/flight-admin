import { Test, TestingModule } from '@nestjs/testing';
import { FlightAdminLoginController } from './flight-admin-login.controller';

describe('FlightAdminLoginController', () => {
  let controller: FlightAdminLoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightAdminLoginController],
    }).compile();

    controller = module.get<FlightAdminLoginController>(
      FlightAdminLoginController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
