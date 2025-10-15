import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCredentialGroupRequestBodyDto {
  @ApiProperty({
    example: 'First Group',
  })
  @IsString()
  name: string;
}
