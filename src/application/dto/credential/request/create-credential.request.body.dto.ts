import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCredentialRequestBodyDto {
  @ApiProperty({
    example: 'Google Account',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://accounts.google.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  link?: string;

  @ApiProperty({
    example: 'user@example.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: 'mySecurePassword123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  credentialGroupId: string;
}
