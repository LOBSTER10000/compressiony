import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
    Column,
    JoinColumn,
  } from 'typeorm';
import { ConvertFile } from './convertFile.entity';

@Entity('DownloadFile')
export class DownloadFile {
  @PrimaryGeneratedColumn()
  id : string;

  @ManyToOne(()=> ConvertFile, (convertFile)=>convertFile.id)
  @JoinColumn({name : 'convertFileId'})
  convertFile : ConvertFile;

  @Column()
  userUUID : string;

  @Column()
  downloadPath : string;
}