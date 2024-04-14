import { IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @IsString()
  @ApiProperty({
    example: 'Дележка имущества между наследниками',
    description: 'Описание заявки',
  })
  description: string;

  @IsString()
  @ApiProperty({ example: 'Наследство', description: 'Тип права' })
  type_right: string;

  @IsDate()
  @ApiProperty({
    example: '2022-01-01:00:00:00',
    description: 'Предлагаемая клиентом дата консультации',
  })
  suggested_date_meeting: Date;
}
