import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetInfoAboutLawyerDto extends CreateUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: false })
  verified: boolean;

  @ApiProperty({ example: false })
  banned: boolean;
}
