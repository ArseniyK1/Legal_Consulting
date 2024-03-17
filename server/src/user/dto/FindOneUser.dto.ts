import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleReturnObject } from '../../return-object/role.return-object';

export class FindOneUserDto extends RoleReturnObject {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: 'id' })
  _id?: string;
}
