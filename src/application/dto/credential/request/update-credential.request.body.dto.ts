import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCredentialRequestBodyDto {
  @ApiProperty({
    example: 'Updated Google Account',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'https://accounts.google.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  link?: string;

  @ApiProperty({
    example: 'updated@example.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: 'newSecurePassword456',
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;
}
