import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCredentialGroupRequestBodyDto {
  @ApiProperty({
    example: 'Updated Group Name',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
