import { PartialType } from '@nestjs/mapped-types';
import { CreateFilesDto } from './create-files.dto';
import { IsString } from 'class-validator';

export class UpdateFilesDto extends PartialType(CreateFilesDto) {
    @IsString()
    status? : string;

    @IsString()
    convertedPath? : string;
}
