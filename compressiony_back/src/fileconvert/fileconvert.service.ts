import { Injectable, Req, Res, UploadedFiles } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { ConvertFile } from 'src/entities/convertFile.entity';
import { OriginalFile } from 'src/entities/originalFile.entity';
import { Repository } from 'typeorm';
import { extractFull } from 'node-7z';
import * as compressing from 'compressing';
import * as path from 'path';
import * as fs from 'fs';
import { compressTo7z, compressWithTar, uncompress7z, uncompressTar, uncompressZip } from './fileconvert.compress';

@Injectable()
export class FileconvertService {

  constructor(
    @InjectRepository(OriginalFile)
    private readonly originalFileRepository : Repository<OriginalFile>,
    @InjectRepository(ConvertFile)
    private readonly convertFileRepository : Repository<ConvertFile>
  )
    {}

  // 
  async uploadFile(@Req() req, @Res() res , @UploadedFiles() files : Express.Multer.File[], user : any){
     try{
      const uploadingSession : string = randomBytes(6).toString('hex');
      const userUUID : string = Array.isArray(user.userUUID) ? user.userUUID[0] : user.userUUID;

      // file의 original 정보값 저장 
      files.forEach(async (item)=>{
        const typeIndex : number = item.filename.lastIndexOf('.');
        const fileType : string = item.filename.slice(typeIndex+1, item.filename.length);
        const filename : string = item.filename.slice(0, typeIndex);

        await this.originalFileRepository.insert({
          userUUID : userUUID,
          originalName : filename,
          uploadPath : item.path,
          size : item.size,
          type : fileType,
          uploadingSession : uploadingSession, 
        });
      });
      return files;
     } catch(err){
      console.error(err);
     }
  }

  // uncompress file
  async uncompressFile(type: string, inputPath: string, outputDirectory: string) {
    const uncompressMethods = {
      zip: () => uncompressZip(inputPath, outputDirectory),
      tar: () => uncompressTar(inputPath, outputDirectory),
      tgz: () => compressing.tgz.uncompress(inputPath, outputDirectory),
      gzip : () => compressing.gzip.uncompress(inputPath, outputDirectory),
      '7z': () => uncompress7z(inputPath, outputDirectory),
    };
  
    type = type.toLocaleLowerCase();
    if (uncompressMethods[type]) {
      try {
        await uncompressMethods[type]();
        console.log(`${type} 압축 해제 완료: ${outputDirectory}`);
      } catch (err) {
        console.error(`${type} 압축 해제 오류: ${err}`);
      }
    } else {
      console.error(`지원되지 않는 압축 형식 1: ${type}`);
    }
  }

  async convertInsertData(conversionType : string , outputPath : string ,convertFileInfo : OriginalFile, status = 'PENDING', errorMessage : string | null = null){
    await this.convertFileRepository.insert({
      conversionName : convertFileInfo.originalName,
      userUUID : convertFileInfo.userUUID,
      conversionPath : outputPath,
      originalFile : convertFileInfo,
      conversionType : conversionType,
      completedAt : status === 'COMPLETE' ? new Date() : null,
      status : status,
      ErrorCode : errorMessage,
    })
    .then(()=>{
      console.log('성공한 정보 저장 성공');
    })
    .catch((err)=>{
      console.error(err);
    });
  };


  //remove Files
  async convertSuccessRemove(inputPath, outputDirectory){
    const uploadFiles = await fs.promises.stat(inputPath);
    if(uploadFiles.isFile()){
      await fs.promises.unlink(inputPath);
    }

    const directory = await fs.promises.stat(outputDirectory);
    if(directory.isDirectory()){
      await fs.promises.rm(outputDirectory, {recursive : true, force : true});
    } 
  }

  // compress file 
  async compressFile(conversionType: string, inputPath: string, outputPath: string, convertFilesInfo : OriginalFile) {
    const compressMethods = {
      zip: async () => await compressing.zip.compressDir(inputPath, outputPath)
      .then(async ()=>{
        await this.convertInsertData(conversionType, outputPath, convertFilesInfo, 'COMPLETE');
      })
      .catch(async (error)=>{
        await this.convertInsertData(conversionType, outputPath, convertFilesInfo, 'FAILED', error);
      })
      ,
      tar: async () => await compressing.tar.compressDir(inputPath, outputPath)
      .then(async ()=>{
        await this.convertInsertData(conversionType, outputPath, convertFilesInfo, 'COMPLETE');
      })
      .catch(async (error)=>{
        await this.convertInsertData(conversionType, outputPath, convertFilesInfo, 'FAILED', error);
      })
      ,
      tgz: async () => await compressing.tgz.compressDir(inputPath, outputPath)
      .then(async ()=>{
        await this.convertInsertData(conversionType, outputPath, convertFilesInfo, 'COMPLETE');
      })
      .catch(async (error)=>{
        await this.convertInsertData(conversionType, outputPath, convertFilesInfo, 'FAILED', error);
      })
      ,
      '7z': async () => await compressTo7z(inputPath, outputPath)
      .then(async ()=>{
        await this.convertInsertData(conversionType, outputPath, convertFilesInfo, 'COMPLETE');
      })
      .catch(async (error)=>{
        await this.convertInsertData(conversionType, outputPath, convertFilesInfo, 'FAILED', error);
      })
      ,
    };
  
    if (compressMethods[conversionType]) {
      try {
        await compressMethods[conversionType]();
        console.log(`${conversionType} 압축 완료: ${outputPath}`);
      } catch (err) {
        console.error(`${conversionType} 압축 오류: ${err}`);
      }
    } else {
      console.error(`지원되지 않는 압축 형식 2: ${conversionType}`);
    }
  }
  

  //bullmq 사용 이전 
  async convertFile(@Req() request, @Res() response, user: any) {
    // Uploading session find
    const uploadingInfo = await this.originalFileRepository.findOne({
      select: ['uploadingSession'],
      where: [{ userUUID: user.userUUID }],
      order: { createdAt: 'desc' },
    });
  
    // Converting할 정보들 find
    const converFilesInfo = await this.originalFileRepository.find({
      where: [
        {
          uploadingSession: uploadingInfo.uploadingSession,
          userUUID: user.userUUID,
        },
      ],
    });
  
    // Uncompressing
    for (const file of converFilesInfo) {
      const outputDirectory = path.join(process.cwd(), 'uncompress', file.originalName);
      await this.uncompressFile(file.type, file.uploadPath, outputDirectory);
    }
  
    // Compressing
    for (const file of converFilesInfo) {
      const inputPath = path.join(process.cwd(), 'uncompress', file.originalName);
      const outputPath = path.join(process.cwd(), 'convert', `${file.originalName}.${user.conversionType}`);
      await this.compressFile(user.conversionType, inputPath, outputPath, file);
      await this.convertSuccessRemove(file.uploadPath, inputPath);
    }
  
    return converFilesInfo;
  }

    

}
