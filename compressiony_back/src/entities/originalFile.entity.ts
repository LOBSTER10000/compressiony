import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';

  
  @Entity('originalFile')
  export class OriginalFile {
    @PrimaryGeneratedColumn()
    id : string;
  
    @Column()
    userUUID : string;
  
    @Column()
    originalName : string;
  
    @Column()
    uploadPath : string;
  
    @Column()
    size : number;
  
    @Column()
    type : string;
  
    @CreateDateColumn()
    createdAt : Date;
  }