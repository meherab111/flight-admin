import { Test, TestingModule } from '@nestjs/testing';
import { FlightAdminLoginService } from './flight-admin-login.service';

describe('FlightAdminLoginService', () => {
  let service: FlightAdminLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightAdminLoginService],
    }).compile();

    service = module.get<FlightAdminLoginService>(FlightAdminLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
