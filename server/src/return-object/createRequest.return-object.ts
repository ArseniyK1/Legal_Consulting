import { ReqGuardsReturnObject } from './reqGuards.return-object';
import { AllRequestReturnObject } from './allRequestReturn.return-object';
import { ApiProperty } from '@nestjs/swagger';

export class userRequestDto {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 2 })
  requestId: number;
  @ApiProperty({ example: 3 })
  userId: number;
}

export class CreateRequestReturnObject {
  @ApiProperty({ example: ReqGuardsReturnObject })
  user: ReqGuardsReturnObject;
  @ApiProperty({ example: AllRequestReturnObject })
  request: AllRequestReturnObject;
  @ApiProperty({ example: userRequestDto })
  userRequest: userRequestDto;
}
