import {diskStorage} from 'multer';
import { join } from 'path';


export const fileUploadMulterOptions = {
    storage : diskStorage({
        destination : (req, file, callback)=> {
            let uploadPath = join(process.cwd(), 'upload');

            callback(null, uploadPath);
        },
        filename : (req, file, callback)=> {
            let name = file.originalname;
            callback(null, name);
        }
    })
}

export const fileConvertMulterOptions = {
        fileFilter : (req, file, callback)=>{

        },

        storage : diskStorage({
            destination : (req, fil, callback)=>{

            },

            filename : (req, file, callback)=>{

            }
        })
}