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

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'После 25.05.2024 буду вне зоны доступа сети',
    description: 'Доп. информация',
  })
  additional_inf?: string;
}
