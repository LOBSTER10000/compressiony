import { IsString, IsNumber, IsUUID, IsOptional } from "class-validator";

export class CreateFilesDto {
    @IsUUID()
    userUUID : string;

    @IsOptional()
    @IsString()
    originalName : string;

    @IsOptional()
    @IsNumber()
    size : number;

    @IsOptional()
    @IsString()
    type : string;

    @IsOptional()
    @IsString()
    path : string;
}
