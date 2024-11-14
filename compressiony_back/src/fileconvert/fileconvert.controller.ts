import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseInterceptors, UploadedFiles, ValidationPipe } from '@nestjs/common';
import { FileconvertService } from './fileconvert.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileUploadMulterOptions } from './fileconvert.multer';
<<<<<<< HEAD
=======
import * as fs from 'fs';
import { CreateFilesDto } from 'src/dto/create-files.dto';
>>>>>>> 323b0f0b5748f96e8cb104951a116e243c2db3c2

@Controller('fileconvert')
export class FileconvertController {
  constructor(
    private readonly fileconvertService: FileconvertService
  ) {}

  
  @Post('/uploadFile')
  @UseInterceptors(FilesInterceptor('file', null, fileUploadMulterOptions))
<<<<<<< HEAD
  async uploadFile(@Req() request, @Res() response, @UploadedFiles() files : Express.Multer.File[], @Body() body : any){
      try{
        const user = JSON.parse(JSON.stringify(body));
        let result = await this.fileconvertService.uploadFile(request, response, files, user);
=======
  async uploadFile(@Req() request, @Res() response, @UploadedFiles() files : Express.Multer.File[], @Body(new ValidationPipe()) body : CreateFilesDto){
      try{
        const user : CreateFilesDto = JSON.parse(JSON.stringify(body));
        let result : Express.Multer.File[] = await this.fileconvertService.uploadFile(request, response, files, user);
>>>>>>> 323b0f0b5748f96e8cb104951a116e243c2db3c2
        return response.json(result);
      } catch(err){
        console.error(err);
      }
  }

  @Post('/convertFile')
<<<<<<< HEAD
  async convertFile(@Req() request, @Res() response, @Body() body : any){
    try{
      const result = await this.fileconvertService.convertFile(request, response, body);
      return result;
    }
    catch(err){
      console.error(err);
    }
  }


  @Post('/downloadFile')
  async downloadFile(@Req() request, @Res() response, @Body() body : any){
    
=======
  async convertFile(@Req() request, @Res() response, @Body() body){
>>>>>>> 323b0f0b5748f96e8cb104951a116e243c2db3c2
  }
}
