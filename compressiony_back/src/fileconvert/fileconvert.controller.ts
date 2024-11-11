import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileconvertService } from './fileconvert.service';
import { CreateFileconvertDto } from './dto/create-fileconvert.dto';
import { UpdateFileconvertDto } from './dto/update-fileconvert.dto';

@Controller('fileconvert')
export class FileconvertController {
  constructor(private readonly fileconvertService: FileconvertService) {}

  @Post()
  create(@Body() createFileconvertDto: CreateFileconvertDto) {
    return this.fileconvertService.create(createFileconvertDto);
  }

  @Get()
  findAll() {
    return this.fileconvertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileconvertService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileconvertDto: UpdateFileconvertDto) {
    return this.fileconvertService.update(+id, updateFileconvertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileconvertService.remove(+id);
  }
}
