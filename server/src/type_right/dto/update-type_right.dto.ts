import { PartialType } from '@nestjs/swagger';
import { CreateTypeRightDto } from './create-type_right.dto';

export class UpdateTypeRightDto extends PartialType(CreateTypeRightDto) {}
