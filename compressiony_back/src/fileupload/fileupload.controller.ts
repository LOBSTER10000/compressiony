import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { CreateFileuploadDto } from './dto/create-fileupload.dto';
import { UpdateFileuploadDto } from './dto/update-fileupload.dto';

@Controller('fileupload')
export class FileuploadController {
  constructor(private readonly fileuploadService: FileuploadService) {}

  @Post()
  create(@Body() createFileuploadDto: CreateFileuploadDto) {
    return this.fileuploadService.create(createFileuploadDto);
  }

  @Get()
  findAll() {
    return this.fileuploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileuploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileuploadDto: UpdateFileuploadDto) {
    return this.fileuploadService.update(+id, updateFileuploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileuploadService.remove(+id);
  }
}
