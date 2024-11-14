import { Injectable, Req, Res, UploadedFiles } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { ConvertFile } from 'src/entities/convertFile.entity';
import { OriginalFile } from 'src/entities/originalFile.entity';
import { Repository } from 'typeorm';
import { extractFull } from 'node-7z';
import * as compressing from 'compressing';
import * as path from 'path';
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

  async uncompressFile(type: string, inputPath: string, outputDirectory: string) {
    const uncompressMethods = {
      zip: () => uncompressZip(inputPath, outputDirectory),
      tar: () => uncompressTar(inputPath, outputDirectory),
      tgz: () => compressing.tgz.uncompress(inputPath, outputDirectory),
      gzip : () => compressing.gzip.uncompress(inputPath, outputDirectory),
      '7z': () => uncompress7z(inputPath, outputDirectory),
    };
  
    if (uncompressMethods[type]) {
      try {
        await uncompressMethods[type]();
        console.log(`${type} 압축 해제 완료: ${outputDirectory}`);
      } catch (err) {
        console.error(`${type} 압축 해제 오류: ${err}`);
      }
    } else {
      console.error(`지원되지 않는 압축 형식: ${type}`);
    }
  }

  async compressFile(conversionType: string, inputPath: string, outputPath: string) {
    const compressMethods = {
      zip: () => compressing.zip.compressDir(inputPath, outputPath),
      tar: () => compressing.tar.compressDir(inputPath, outputPath),
      tgz: () => compressing.tgz.compressDir(inputPath, outputPath),
      '7z': () => compressTo7z(inputPath, outputPath),
    };
  
    if (compressMethods[conversionType]) {
      try {
        await compressMethods[conversionType]();
        console.log(`${conversionType} 압축 완료: ${outputPath}`);
      } catch (err) {
        console.error(`${conversionType} 압축 오류: ${err}`);
      }
    } else {
      console.error(`지원되지 않는 압축 형식: ${conversionType}`);
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
      await this.compressFile(user.conversionType, inputPath, outputPath);
    }
  
    return converFilesInfo;
  }
}
