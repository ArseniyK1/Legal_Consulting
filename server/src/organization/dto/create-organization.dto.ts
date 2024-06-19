import { IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  short_name?: string;
  @IsString()
  @IsOptional()
  contacts?: string;
  @IsString()
  @IsOptional()
  inn?: string;
  @IsString()
  @IsOptional()
  address?: string;
  @IsString()
  @IsOptional()
  photo?: string;
}
