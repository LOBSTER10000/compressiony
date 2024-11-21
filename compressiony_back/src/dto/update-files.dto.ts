import { PartialType } from '@nestjs/mapped-types';
import { CreateFilesDto } from './create-files.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFilesDto extends PartialType(CreateFilesDto) {
    
    @IsString()
    @ApiProperty()
    @IsOptional()
    status? : string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    convertedPath? : string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    conversaionType? : string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    uploadingSession : string;
}
