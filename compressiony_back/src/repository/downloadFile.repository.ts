import { Injectable } from "@nestjs/common";
import { DownloadFile } from "src/entities/downloadFile.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class DownloadFileRepository extends Repository<DownloadFile> {
    constructor(private dataSource : DataSource){
        super(DownloadFile, dataSource.createEntityManager());
    }
}