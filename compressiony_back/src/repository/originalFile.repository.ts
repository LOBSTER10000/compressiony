import { Injectable } from "@nestjs/common";
import { OriginalFile } from "src/entities/originalFile.entity";
import { DataSource, getManager, Repository } from "typeorm";

@Injectable()
export class OriginalFileRepository extends Repository<OriginalFile> {
    constructor(private dataSource : DataSource){
        super(OriginalFile, dataSource.createEntityManager());
    }
<<<<<<< HEAD

    
=======
>>>>>>> 323b0f0b5748f96e8cb104951a116e243c2db3c2
}