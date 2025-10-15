import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateCredentialGroupRequestBodyDto {
  @ApiProperty({
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Please Enter a valid e-posta.' })
  email: string;

  @ApiProperty({
    example: 'StrongPass123!',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır.' })
  password: string;
}
