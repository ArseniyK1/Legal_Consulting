import { PartialType } from '@nestjs/swagger';
import { CreateTroubleDto } from './create-trouble.dto';

export class UpdateTroubleDto extends PartialType(CreateTroubleDto) {}
