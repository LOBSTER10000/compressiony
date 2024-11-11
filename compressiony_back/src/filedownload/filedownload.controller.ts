import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FiledownloadService } from './filedownload.service';
import { CreateFiledownloadDto } from './dto/create-filedownload.dto';
import { UpdateFiledownloadDto } from './dto/update-filedownload.dto';

@Controller('filedownload')
export class FiledownloadController {
  constructor(private readonly filedownloadService: FiledownloadService) {}

  @Post()
  create(@Body() createFiledownloadDto: CreateFiledownloadDto) {
    return this.filedownloadService.create(createFiledownloadDto);
  }

  @Get()
  findAll() {
    return this.filedownloadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filedownloadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFiledownloadDto: UpdateFiledownloadDto) {
    return this.filedownloadService.update(+id, updateFiledownloadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filedownloadService.remove(+id);
  }
}
