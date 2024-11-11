import { PartialType } from '@nestjs/mapped-types';
import { CreateFileconvertDto } from './create-fileconvert.dto';

export class UpdateFileconvertDto extends PartialType(CreateFileconvertDto) {}
