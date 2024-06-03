import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @IsString()
  @ApiProperty({
    example: 'Дележка имущества между наследниками',
    description: 'Описание заявки',
  })
  description: string;

  @IsNumber()
  @ApiProperty({ example: 'Наследство', description: 'Тип права' })
  type_right: number;

  @IsString()
  @ApiProperty({ example: 'Право собственности', description: 'Тип проблемы' })
  trouble_type: string;
}
