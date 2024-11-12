import { Injectable } from "@nestjs/common";
import { OriginalFile } from "src/entities/originalFile.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class OriginalFileRepository extends Repository<OriginalFile> {
    constructor(private dataSource : DataSource){
        super(OriginalFile, dataSource.createEntityManager());
    }
}