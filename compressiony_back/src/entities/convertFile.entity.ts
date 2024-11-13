import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn
  } from 'typeorm';
import { OriginalFile } from './originalFile.entity';

@Entity('convertFile')
export class ConvertFile {
  @PrimaryGeneratedColumn()
  id : string;

  @Column()
  userUUID : string;

  @ManyToOne(()=> OriginalFile, (originalFile)=>originalFile.id)
  @JoinColumn({name : 'originalFileId'})
  originalFile : OriginalFile;

  @Column({type : 'enum', enum : ['PENDING', 'IN_PROGRESS', 'COMPLETE', 'FAILED']})
  status : string;

  @Column({nullable : true})
  ErrorCode : string;

  @Column()
  conversionType : string;

  @Column({nullable : true})
  completedAt : Date;

  @Column()
  conversionName : string;

  @Column()
  conversionPath : string;
}