import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { requestStatusEnum } from '../../constants';

export class ChangeStatusDto {
  @IsNotEmpty()
  @IsNumber()
  requestId: number;

  @IsEnum(requestStatusEnum)
  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  lawyerId?: number;
}
