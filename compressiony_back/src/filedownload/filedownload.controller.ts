import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FiledownloadService } from './filedownload.service';


@Controller('filedownload')
export class FiledownloadController {
  constructor(private readonly filedownloadService: FiledownloadService) {}

 
}
