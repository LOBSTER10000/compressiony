import { Injectable, Req, Res, UploadedFiles } from '@nestjs/common';


@Injectable()
export class FileconvertService {

  constructor(){}

  async uploadFile(@Req() req : Request, @Res() res : Response, @UploadedFiles() file : File[]){
     return file;
  }
}
