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
      envFilePath : join(process.cwd(), 'src/config/config.env'),
      isGlobal : true,
    }),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : (configService : ConfigService)=> ({
        type : 'mysql',
        port : 3306,
        username : process.env.FILE_USERSNAME,
        password : process.env.FILE_PASSWORDS,
        database : process.env.FILE_DATABASES,
        entities : [OriginalFile, ConvertFile, DownloadFile],
        synchronize : true,
        logging : false,
        dropSchema : true,
      }),
    }),
    FileconvertModule, 
    FiledownloadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

console.log(process.env.FILE_USERNAME);