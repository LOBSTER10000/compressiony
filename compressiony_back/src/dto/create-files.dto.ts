import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsUUID, IsOptional } from "class-validator";

export class CreateFilesDto {
    @IsUUID()
    @ApiProperty()
    userUUID : string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    originalName : string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    size : number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    type : string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    path : string;

    @ApiProperty({
        type : 'string',
        format : 'binary',
        description : 'send uploading File'
      })
    @IsOptional()
    file : any;

    @IsString()
    @IsOptional()
    uploadingSession : string;
}
