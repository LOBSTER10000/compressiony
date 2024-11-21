import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseInterceptors, UploadedFiles, ValidationPipe } from '@nestjs/common';
import { FileconvertService } from './fileconvert.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileUploadMulterOptions } from './fileconvert.multer';
import * as fs from 'fs';
import { CreateFilesDto } from 'src/dto/create-files.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateFilesDto } from 'src/dto/update-files.dto';

@ApiTags('fileconvert')
@Controller('fileconvert')
export class FileconvertController {
  constructor(
    private readonly fileconvertService: FileconvertService
  ) {}

  @ApiOperation({summary : 'Upload files', description : 'Upload files submitted by the client to the internal system'})
  @ApiConsumes('multipart/form-data')
  @ApiBody({type : CreateFilesDto})
  @ApiResponse({status: 200, description : 'file upload Success'})
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

  @ApiOperation({summary : 'convertFile', description : 'first, uncompress file in uncompress path'})
  @ApiBody({type : UpdateFilesDto})
  @ApiResponse({status : 200, description : 'file convert and insert mysql success'})
  @Post('/convertFile')
  async convertFile(@Req() request, @Res() response, @Body() body : any){
    try{
      const result = await this.fileconvertService.convertFile(request, response, body);
      return response.json(result);
    }
    catch(err){
      console.error(err);
    }
  }


  @ApiOperation({summary : 'downloadFile', description : 'Download the converted files, which will be deleted after the download is complete'})
  @ApiResponse({status : 200, description : 'download the converted files, which will be deleted at after the download is complete'})
  @Post('/downloadFile')
  async downloadFile(@Req() request, @Res() response, @Body() body : any){
    try{
      return await this.fileconvertService.downloadFiles(request, response, body);
    }
    catch (err){
      console.error(err);
      response.status(500).send('Error during file download');
    }
  }
}
