import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleReturnObject } from '../../return-object/role.return-object';
import { Type } from 'class-transformer';

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
  last_name?: string;

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

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example:
      'Липецкий Государственный Технический Университет Кафедра Юриприспруденции',
    description: 'Образование юриста',
  })
  education?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '2 года 4 месяца', description: 'Стаж юриста' })
  work_experience?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    example: '02.02.2002',
    description: 'Дата рождения пользователя',
  })
  date_of_birth?: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'mail@mail.ru', description: 'Почта пользователя' })
  contact_email?: string;

  @IsNumber()
  @IsOptional()
  organization_id?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: 'Хочет ли пользователь зарегистрироваться как юрист',
  })
  isLawyer?: boolean;

  @IsArray()
  @IsOptional()
  type_law?: string[];

  @ApiProperty({ example: RoleReturnObject })
  role: RoleReturnObject;
}
