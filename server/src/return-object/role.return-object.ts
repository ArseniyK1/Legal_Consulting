import { ApiProperty } from '@nestjs/swagger';

export class RoleReturnObject {
  @ApiProperty({ example: 1, description: 'id роли' })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'значение роли' })
  value: string;

  @ApiProperty({ example: 'Администратов', description: 'описание роли' })
  description: string;
}
