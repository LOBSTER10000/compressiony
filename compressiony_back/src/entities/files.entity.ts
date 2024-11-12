import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('files')
export class Files {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    originalName: string; // 원래 파일명
  
    @Column()
    path: string; // 파일 경로
  
    @Column()
    size: number; // 파일 크기
  
    @Column()
    format: string; // 파일 형식 (예: zip, 7z)
  
    @Column({ nullable: true })
    convertedPath: string; // 변환된 파일의 경로
  
    @Column({ default: 'pending' })
    status: string; // 변환 상태 (예: pending, completed, failed)
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
