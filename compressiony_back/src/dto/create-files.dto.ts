import { IsString, IsNumber } from "class-validator";

export class CreateFilesDto {
    @IsString()
    originalName : string;

    @IsNumber()
    size : number;

    @IsString()
    format : string;

    @IsString()
    path : string;
}
