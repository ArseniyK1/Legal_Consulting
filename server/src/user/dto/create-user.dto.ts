import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'Арсений', description: 'Имя пользователя' })
  first_name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'Киселев', description: 'Фамилия пользователя' })
  second_name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'Александрович',
    description: 'Отчество пользователя',
  })
  middle_name?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'login123', description: 'Логин пользователя' })
  login?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456', description: 'Пароль пользователя' })
  password?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: '89127418291', description: 'Телефон пользователя' })
  phonenumber?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'photo.jpg', description: 'Фото пользователя' })
  photo?: string;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: '02.02.2002',
    description: 'Дата рождения пользователя',
  })
  date_of_birth?: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'mail@mail.ru', description: 'Почта пользователя' })
  contact_email?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: 'Хочет ли пользователь зарегистрироваться как юрист',
  })
  isLawyer?: boolean;
}
