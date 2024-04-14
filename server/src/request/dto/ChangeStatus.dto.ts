import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ChangeStatusDto {
  @IsNotEmpty()
  @IsNumber()
  requestId: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  lawyerId?: number;
}
