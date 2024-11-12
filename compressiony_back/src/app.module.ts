import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileuploadModule } from './fileupload/fileupload.module';
import { FileconvertModule } from './fileconvert/fileconvert.module';
import { FiledownloadModule } from './filedownload/filedownload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './entities/files.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : [`${__dirname}/config/config.env`],
      isGlobal : true,
    }),
    TypeOrmModule.forRoot({
      type : 'mysql',
      host : 'localhost',
      port : 3306,
      username : process.env.USERNAME,
      password : process.env.PASSWORD,
      database : process.env.DATABASE,
      entities : [Files],
    }),
    FileuploadModule, 
    FileconvertModule, 
    FiledownloadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
