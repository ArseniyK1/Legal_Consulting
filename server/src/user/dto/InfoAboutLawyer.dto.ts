import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InfoAboutLawyerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '11', description: 'ID юриста' })
  lawyerId: string;
}
