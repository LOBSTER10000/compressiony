import { Injectable } from '@nestjs/common';
import { CreateFiledownloadDto } from './dto/create-filedownload.dto';
import { UpdateFiledownloadDto } from './dto/update-filedownload.dto';

@Injectable()
export class FiledownloadService {
  create(createFiledownloadDto: CreateFiledownloadDto) {
    return 'This action adds a new filedownload';
  }

  findAll() {
    return `This action returns all filedownload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filedownload`;
  }

  update(id: number, updateFiledownloadDto: UpdateFiledownloadDto) {
    return `This action updates a #${id} filedownload`;
  }

  remove(id: number) {
    return `This action removes a #${id} filedownload`;
  }
}
