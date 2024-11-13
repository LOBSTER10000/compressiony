import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';


@Controller('fileupload')
export class FileuploadController {
  constructor(private readonly fileuploadService: FileuploadService) {}
  
}
