import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileconvertService } from './fileconvert.service';

@Controller('fileconvert')
export class FileconvertController {
  constructor(private readonly fileconvertService: FileconvertService) {}

  
}
