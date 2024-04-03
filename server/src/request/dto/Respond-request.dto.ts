import { IsNotEmpty, IsString } from 'class-validator';

export class RespondRequestDto {
  @IsString()
  @IsNotEmpty()
  requestId: string;
}
