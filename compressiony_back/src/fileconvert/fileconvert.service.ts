import { Injectable, Req, Res, UploadedFiles } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OriginalFile } from 'src/entities/originalFile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileconvertService {

  constructor(
    @InjectRepository(OriginalFile)
    private readonly originalFileRepository : Repository<OriginalFile>)
    {}

  async uploadFile(@Req() req, @Res() res , @UploadedFiles() files : Express.Multer.File[], user : any){
     try{

      const userUUID = Array.isArray(user.userUUID) ? user.userUUID[0] : user.userUUID;
      
      // file의 original 정보값 저장 
      files.forEach(async (item)=>{
        const typeIndex = item.filename.lastIndexOf('.');
        const fileType = item.filename.slice(typeIndex+1, item.filename.length);
        const filename = item.filename.slice(0, typeIndex);

        await this.originalFileRepository.insert({
          userUUID : userUUID,
          originalName : filename,
          uploadPath : item.path,
          size : item.size,
          type : fileType,
        });
      });

      return files;
     } catch(err){
      console.error(err);
     }
  }
}
