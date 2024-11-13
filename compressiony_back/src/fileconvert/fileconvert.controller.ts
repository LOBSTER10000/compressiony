import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseInterceptors, UploadedFiles, ValidationPipe } from '@nestjs/common';
import { FileconvertService } from './fileconvert.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileUploadMulterOptions } from './fileconvert.multer';
import * as fs from 'fs';
import { CreateFilesDto } from 'src/dto/create-files.dto';

@Controller('fileconvert')
export class FileconvertController {
  constructor(
    private readonly fileconvertService: FileconvertService
  ) {}

  
  @Post('/uploadFile')
  @UseInterceptors(FilesInterceptor('file', null, fileUploadMulterOptions))
  async uploadFile(@Req() request, @Res() response, @UploadedFiles() files : Express.Multer.File[], @Body(new ValidationPipe()) body : CreateFilesDto){
      try{
        const user : CreateFilesDto = JSON.parse(JSON.stringify(body));
        let result : Express.Multer.File[] = await this.fileconvertService.uploadFile(request, response, files, user);
        return response.json(result);
      } catch(err){
        console.error(err);
      }
  }

  @Post('/convertFile')
  async convertFile(@Req() request, @Res() response, @Body() body){
  }
}
