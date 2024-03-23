import { ApiProperty } from '@nestjs/swagger';

export class InfoByUserReturnObject {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'Арсений' })
  first_name: string;
  @ApiProperty({ example: 'Киселев' })
  last_name: string;
  @ApiProperty({ example: 'Александрович' })
  middle_name: string;
  @ApiProperty({ example: 'test' })
  login: string;
  @ApiProperty({
    example: '$2b$10$KjXtBeC4gjtvVIugQtWt/eOGForwCdeWbpoZCmmDNu6vUm57fL16m',
  })
  password: string;
  @ApiProperty({ example: '89005964776' })
  phonenumber: string;
  @ApiProperty({ example: false })
  verified: boolean;
  @ApiProperty({ example: 'p1.jpg' })
  photo: string;
  @ApiProperty({ example: '02.02.2002' })
  date_of_birth: string;
  @ApiProperty({ example: 'test@gmail.com' })
  contact_email: string;
  @ApiProperty({ example: false })
  banned: boolean;
}
