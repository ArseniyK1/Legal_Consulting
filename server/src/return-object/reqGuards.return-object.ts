import { ApiProperty } from '@nestjs/swagger';

export class ReqGuardsReturnObject {
  @ApiProperty({ example: '4' })
  userId: number;
  @ApiProperty({ example: 'тест' })
  username: string;
  @ApiProperty({ example: false })
  verified: boolean;
  @ApiProperty({ example: false })
  banned: boolean;
  @ApiProperty({ example: 1709044127 })
  iat: number;
  @ApiProperty({ example: 1709044187 })
  exp: number;
}
