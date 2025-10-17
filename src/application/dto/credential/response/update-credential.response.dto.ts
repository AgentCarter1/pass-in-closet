import { ApiProperty } from '@nestjs/swagger';

export class UpdateCredentialResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'Updated Google Account',
  })
  public readonly name: string;

  @ApiProperty({
    example: 'https://accounts.google.com',
  })
  public readonly link: string;

  @ApiProperty({
    example: 'updated@example.com',
  })
  public readonly email: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  public readonly credentialGroupId: string;

  @ApiProperty({
    example: '2023-12-01T10:00:00.000Z',
  })
  public readonly createdAt: Date;

  @ApiProperty({
    example: '2023-12-01T10:00:00.000Z',
  })
  public readonly updatedAt: Date;

  public constructor(props: Partial<UpdateCredentialResponseDto> = {}) {
    this.id = props.id!;
    this.name = props.name!;
    this.link = props.link!;
    this.email = props.email!;
    this.credentialGroupId = props.credentialGroupId!;
    this.createdAt = props.createdAt!;
    this.updatedAt = props.updatedAt!;
  }
}
