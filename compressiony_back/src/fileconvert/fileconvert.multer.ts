import {diskStorage} from 'multer';
import { join } from 'path';
import * as iconv from 'iconv-lite';

export const fileUploadMulterOptions = {
    storage : diskStorage({
        destination : (req, file, callback)=> {
            let uploadPath = join(process.cwd(), 'upload');

            callback(null, uploadPath);
        },
        filename : (req, file, callback)=> {
            let utf8FileName = iconv.decode(Buffer.from(file.originalname, 'latin1'), 'utf8')  ;
            callback(null, utf8FileName);
        },
    }),
    limits : {fileSize : 50 * 1024 * 1024},

}