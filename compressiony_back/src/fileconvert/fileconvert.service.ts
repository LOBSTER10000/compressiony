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
import { DownloadFile } from 'src/entities/downloadFile.entity';
import { Queue, QueueEvents, Worker} from 'bullmq';
import IORedis from 'ioredis';

@Injectable()
export class FileconvertService {

  constructor(
    @InjectRepository(OriginalFile)
    private readonly originalFileRepository : Repository<OriginalFile>,
    @InjectRepository(ConvertFile)
    private readonly convertFileRepository : Repository<ConvertFile>,
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

  // compress insert data
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

  //remove Files
  async convertSuccessRemove(inputPath, outputDirectory){
    const uploadFiles : fs.Stats = await fs.promises.stat(inputPath);
    if(uploadFiles.isFile()){
      await fs.promises.unlink(inputPath);
    }

    const directory = await fs.promises.stat(outputDirectory);
    if(directory.isDirectory()){
      await fs.promises.rm(outputDirectory, {recursive : true, force : true});
    } 
  }

  //download Files API
  async downloadFiles(@Req() request, @Res() response, body : any){
          if(!fs.existsSync(body.filepath)){
            return response.status(400).send('file not found');
          }

          try{
            console.log(body.filepath);
            const fileIndex : number = body.filepath.lastIndexOf('\\');
            const fileNames : string = body.filepath.slice(fileIndex+1);
            const fileName : string = encodeURIComponent(fileNames);
            response.setHeader(
              'Content-Disposition',
              `attachment; filename="${fileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`
            );
            response.setHeader('Content-Type', 'application/octet-stream');
  
            const fileStream = fs.createReadStream(body.filepath);
            fileStream.pipe(response);

            fileStream.on('close', async()=>{
              await fs.promises.unlink(body.filepath).catch(err=>{
                console.error('file unlink error', err);
              });
            });

            fileStream.on('error', (err)=>{
              console.error('file Stream error', err);
              response.status(500).send('error streaming file');
            });

          }
          catch(err){
            console.error('file Stream error', err);
            response.status(500).send('Internal server error');
          }
  }


  //bullmq 사용 이전 
  
  // async convertFile(@Req() request, @Res() response, user: any) {
  //   console.time();
  //   // Uploading session find
  //   const uploadingInfo : OriginalFile = await this.originalFileRepository.findOne({
  //     select: ['uploadingSession'],
  //     where: [{ userUUID: user.userUUID }],
  //     order: { createdAt: 'desc' },
  //   });
  
  //   // Converting할 정보들 find
  //   const convertFilesInfo = await this.originalFileRepository.find({
  //     where: [
  //       {
  //         uploadingSession: uploadingInfo.uploadingSession,
  //         userUUID: user.userUUID,
  //       },
  //     ],
  //   });
  
  //   // Uncompressing
  //   for (const file of convertFilesInfo) {
  //     const outputDirectory : string = path.join(process.cwd(), 'uncompress', file.originalName);
  //     await this.uncompressFile(file.type, file.uploadPath, outputDirectory);
  //   }
  
  //   // Compressing
  //   for (const file of convertFilesInfo) {
  //     const inputPath = path.join(process.cwd(), 'uncompress', file.originalName);
  //     const outputPath = path.join(process.cwd(), 'convert', `${file.originalName}.${user.conversionType}`);
  //     await this.compressFile(user.conversionType, inputPath, outputPath, file);
  //     await this.convertSuccessRemove(file.uploadPath, inputPath);
  //   }
    
  //   let files = [];
  //   for(const file of convertFilesInfo){
  //     const fileResult = await this.convertFileRepository.find({
  //       where : [
  //         {
  //           originalFile : {id : file.id}
  //         }
  //       ]
  //     });
  //     files.push(...fileResult);
  //   }

  //   console.timeEnd();
  //   if(files.length === convertFilesInfo.length){
  //     return files;
  //   } else {
  //     return false;
  //   }
  // }

    
  //bullmq 사용
  async convertFile(@Req() request, @Res() response, body: any) {
    try {
      console.time('conversion');
      const originalInfo: OriginalFile = await this.originalFileRepository.findOne({
        select: ['uploadingSession'],
        where: [
          { userUUID: body.userUUID }
        ],
        order: { 'createdAt': 'desc' },
      });
  
      const convertFileInfo = await this.originalFileRepository.find({
        where: [
          {
            uploadingSession: originalInfo.uploadingSession,
            userUUID: body.userUUID
          }
        ]
      });
      
      const connection = new IORedis({
        host: 'localhost',
        port: 6379,
        maxRetriesPerRequest: null
      });
      
      const fileQueue = new Queue('file-convert', { connection });
  
      
      const jobIds = new Set<string>();
      for (const convert of convertFileInfo) {
        const jobId = `${convert.userUUID}-${convert.originalName}-${body.conversionType}`;
        jobIds.add(jobId);
        await fileQueue.add('convert-file', {
          userUUID: convert.userUUID,
          conversionType: body.conversionType,
          originalName: convert.originalName,
          uploadPath: convert.uploadPath,
          originalType: convert.type,
          originalField: convert
        }, { jobId });
      }
  
      // Worker 프로세스 시작
      const worker = await this.processWorker(connection);
  
      
      const waitForCompletion = () => {
        return new Promise((resolve, reject) => {
          const checkInterval = setInterval(async () => {
            
            const activeJobs = await fileQueue.getActiveCount();
            const waitingJobs = await fileQueue.getWaitingCount();
            
            
            if (activeJobs === 0 && waitingJobs === 0) {
              clearInterval(checkInterval);
              resolve(true);
            }
          }, 1000);
  
          
          worker.on('failed', (job, err) => {
            clearInterval(checkInterval);
            reject(err);
          });
        });
      };
  
     
      await waitForCompletion();
  
      
      let files = [];
      for (const file of convertFileInfo) {
        const fileResult = await this.convertFileRepository.find({
          where: [
            {
              originalFile: { id: file.id }
            }
          ]
        });
        files.push(...fileResult);
      }
  
      console.timeEnd('conversion');

      await worker.close();
      await fileQueue.close();
      connection.disconnect();
  
      if (files.length === convertFileInfo.length) {
        return files;
      } else {
        return false;
      }
  
    } catch (err) {
      
      throw err;
    }
  }
  
  async processWorker(connection: any) {
    const worker = new Worker('file-convert', async (job) => {
      try {
        let outputDirectory = path.join(process.cwd(), 'uncompress', job.data.originalName);
        let compressDir = path.join(process.cwd(), 'convert', `${job.data.originalName}.${job.data.conversionType}`);
        
        await this.uncompressFile(job.data.originalType, job.data.uploadPath, outputDirectory);
        await this.compressFile(job.data.conversionType, outputDirectory, compressDir, job.data.originalField);
        await this.convertSuccessRemove(job.data.uploadPath, outputDirectory);
        
        console.log('Job completed:', job.id);
      } catch (err) {
        console.error('Job failed:', job.id, err);
        throw err;
      }
    }, {
      concurrency: 6,
      connection,
      removeOnComplete: { age: 0 },
      removeOnFail: { age: 0 }
    });
  
    worker.on('failed', (job, err) => {
      console.log('Worker error:', err);
    });
  
    worker.on('error', (err) => {
      console.error('Worker error:', err);
    });
  
    worker.on('completed', (job) => {
      console.log('Job completed:', job.id);
    });
  
    return worker;
  }
}

