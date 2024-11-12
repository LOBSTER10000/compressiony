import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileconvertService } from './fileconvert.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileUploadMulterOptions } from './fileconvert.multer';

@Controller('fileconvert')
export class FileconvertController {
  constructor(private readonly fileconvertService: FileconvertService) {}

  
  @Post('/uploadFile')
  @UseInterceptors(FilesInterceptor('file', null, fileUploadMulterOptions))
  async uploadFile(@Req() request : Request, @Res() response : Response, @UploadedFiles() files : File[]){
      let result = await this.fileconvertService.uploadFile(request, response, files);
      return result;
  }
}
