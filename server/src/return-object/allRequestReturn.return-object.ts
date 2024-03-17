import { ApiProperty } from '@nestjs/swagger';

export class AllRequestReturnObject {
  @ApiProperty({ example: 1, description: 'ID заявки' })
  id: number;

  @ApiProperty({ example: 'Выполняется', description: 'Статус заявки' })
  status: number;

  @ApiProperty({ example: 'Заявка №123321', description: 'Описание заявки' })
  description: number;
}
