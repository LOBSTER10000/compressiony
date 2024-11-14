import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileconvertModule } from './fileconvert/fileconvert.module';
import { FiledownloadModule } from './filedownload/filedownload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { OriginalFile } from './entities/originalFile.entity';
import { ConvertFile } from './entities/convertFile.entity';
import { DownloadFile } from './entities/downloadFile.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : join(__dirname, '..', 'src/config/config.env'),
      isGlobal : true,
    }),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : ()=> ({
        type : 'mysql',
        port : 3306,
        username : 
        password : 
        database : 
        entities : [OriginalFile, ConvertFile, DownloadFile],
<<<<<<< HEAD
        synchronize : true,
        logging : false,
        dropSchema : true,
=======
        synchronize : false,
        logging : false,
        dropSchema : false,
>>>>>>> 323b0f0b5748f96e8cb104951a116e243c2db3c2
      }),
    }),
    FileconvertModule, 
    FiledownloadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

console.log(process.env.FILE_USERNAME);