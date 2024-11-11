import { Test, TestingModule } from '@nestjs/testing';
import { FileconvertService } from './fileconvert.service';

describe('FileconvertService', () => {
  let service: FileconvertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileconvertService],
    }).compile();

    service = module.get<FileconvertService>(FileconvertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
