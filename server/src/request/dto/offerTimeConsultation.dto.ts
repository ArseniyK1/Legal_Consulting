import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Timestamp } from 'typeorm';

export class OfferTimeConsultationDto {
  @IsDateString()
  @IsNotEmpty()
  suggested_date: Date;

  @IsString()
  @IsNotEmpty()
  requestId: string;
}
