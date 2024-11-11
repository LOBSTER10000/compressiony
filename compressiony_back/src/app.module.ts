import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FileuploadModule } from './fileupload/fileupload.module';
import { FileconvertModule } from './fileconvert/fileconvert.module';
import { FiledownloadModule } from './filedownload/filedownload.module';

@Module({
  imports: [UserModule, FileuploadModule, FileconvertModule, FiledownloadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
