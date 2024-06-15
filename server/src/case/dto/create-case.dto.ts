import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCaseDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  issue: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  article: string;
}
