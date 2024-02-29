import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCaseDto {
  @IsString()
  @IsOptional()
  type?: string;

  @IsBoolean()
  @IsOptional()
  success?: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  article?: string;
}
