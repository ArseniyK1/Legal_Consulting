import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCaseDto {
  @IsString()
  @IsNotEmpty()
  issue: string;

  @IsString()
  @IsOptional()
  number?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  article: string;
}
