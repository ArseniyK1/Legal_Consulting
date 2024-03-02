import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RoleByValueDto {
  @ApiProperty({
    example: 'LAWYER',
    description: 'Наименование роли: USER, LAWYER, ADMIN',
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}
