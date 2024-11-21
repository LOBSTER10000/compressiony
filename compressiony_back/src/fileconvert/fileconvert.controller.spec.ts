import { Test, TestingModule } from '@nestjs/testing';
import { FileconvertController } from './fileconvert.controller';
import { FileconvertService } from './fileconvert.service';
import { UploadedFile } from '@nestjs/common';


describe('FileconvertController', () => {
  let controller: FileconvertController;
  let service : FileconvertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileconvertController],
      providers: [{
        provide : FileconvertService,
        useValue : {
          uploadedFile : jest.fn(),
          convertFile : jest.fn(),
          downloadFile : jest.fn(), 
        }
      }],
    }).compile();

    controller = module.get<FileconvertController>(FileconvertController);
    service = module.get<FileconvertService>(FileconvertService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be call uploadFile and return result', async ()=>{
    const mockFiles = [{originalname : 'test.txt'}] as Express.Multer.File[];
    const mockBody = { userUUID : 'ewqr431'}
  })
});
