import { Test, TestingModule } from '@nestjs/testing';
import { FiledownloadService } from './filedownload.service';

describe('FiledownloadService', () => {
  let service: FiledownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FiledownloadService],
    }).compile();

    service = module.get<FiledownloadService>(FiledownloadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
