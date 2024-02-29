import { IsNotEmpty, IsString } from 'class-validator';

export class ByLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
