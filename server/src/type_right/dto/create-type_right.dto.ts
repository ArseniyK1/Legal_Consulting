import {
  ArrayNotEmpty,
  IsArray,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTypeRightDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @ArrayNotEmpty({ message: 'Поле type_trouble не должно быть пустым' })
  @IsString({
    each: true,
    message: 'Поле type_trouble должно быть массивом строк',
  })
  @IsArray({ message: 'Поле type_trouble должно быть массивом строк' })
  type_trouble?: Array<string>;
}
