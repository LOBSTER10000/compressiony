import { Module } from '@nestjs/common';
import { FileconvertService } from './fileconvert.service';
import { FileconvertController } from './fileconvert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OriginalFile } from 'src/entities/originalFile.entity';

@Module({
  imports : [TypeOrmModule.forFeature([OriginalFile])],
  controllers: [FileconvertController],
  providers: [FileconvertService],
})
export class FileconvertModule {}
