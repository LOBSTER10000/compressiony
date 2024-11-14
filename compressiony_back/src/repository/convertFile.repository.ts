import { Injectable } from "@nestjs/common";
import { ConvertFile } from "src/entities/convertFile.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class ConvertFileRepository extends Repository<ConvertFile> {
    constructor(private dataSource : DataSource){
        super(ConvertFile, dataSource.createEntityManager());
    }
}