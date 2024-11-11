import { Module } from '@nestjs/common';
import { FileconvertService } from './fileconvert.service';
import { FileconvertController } from './fileconvert.controller';

@Module({
  controllers: [FileconvertController],
  providers: [FileconvertService],
})
export class FileconvertModule {}
