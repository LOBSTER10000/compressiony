import { Test, TestingModule } from '@nestjs/testing';
import { FileconvertController } from './fileconvert.controller';
import { FileconvertService } from './fileconvert.service';

describe('FileconvertController', () => {
  let controller: FileconvertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileconvertController],
      providers: [FileconvertService],
    }).compile();

    controller = module.get<FileconvertController>(FileconvertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
