import { PartialType } from '@nestjs/mapped-types';
import { CreateFiledownloadDto } from './create-filedownload.dto';

export class UpdateFiledownloadDto extends PartialType(CreateFiledownloadDto) {}
