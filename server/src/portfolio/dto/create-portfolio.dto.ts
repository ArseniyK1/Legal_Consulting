import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @IsOptional()
  education?: string;

  @IsInt()
  @IsOptional()
  length_of_service?: number;

  @IsString()
  @IsOptional()
  retraining?: string;
}
