import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @IsString()
  @ApiProperty({ example: 'описание заявки', description: 'Описание заявки' })
  description: string;
}
