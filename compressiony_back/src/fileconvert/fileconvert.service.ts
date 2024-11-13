import { Injectable, Req, Res, UploadedFiles } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { ConvertFile } from 'src/entities/convertFile.entity';
import { OriginalFile } from 'src/entities/originalFile.entity';
import { In, Repository } from 'typeorm';

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
      const uploadingSession = randomBytes(6).toString('hex');
      const userUUID = Array.isArray(user.userUUID) ? user.userUUID[0] : user.userUUID;
      
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
}
