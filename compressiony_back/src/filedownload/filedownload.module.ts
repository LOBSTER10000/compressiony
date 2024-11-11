import { Module } from '@nestjs/common';
import { FiledownloadService } from './filedownload.service';
import { FiledownloadController } from './filedownload.controller';

@Module({
  controllers: [FiledownloadController],
  providers: [FiledownloadService],
})
export class FiledownloadModule {}
