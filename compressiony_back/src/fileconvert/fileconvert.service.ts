import { Injectable } from '@nestjs/common';
import { CreateFileconvertDto } from './dto/create-fileconvert.dto';
import { UpdateFileconvertDto } from './dto/update-fileconvert.dto';

@Injectable()
export class FileconvertService {
  create(createFileconvertDto: CreateFileconvertDto) {
    return 'This action adds a new fileconvert';
  }

  findAll() {
    return `This action returns all fileconvert`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileconvert`;
  }

  update(id: number, updateFileconvertDto: UpdateFileconvertDto) {
    return `This action updates a #${id} fileconvert`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileconvert`;
  }
}
