import { Test, TestingModule } from '@nestjs/testing';
import { FiledownloadController } from './filedownload.controller';
import { FiledownloadService } from './filedownload.service';

describe('FiledownloadController', () => {
  let controller: FiledownloadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiledownloadController],
      providers: [FiledownloadService],
    }).compile();

    controller = module.get<FiledownloadController>(FiledownloadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
