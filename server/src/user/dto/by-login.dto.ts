import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ByLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'test', description: 'Логин пользователя' })
  login: string;
}
