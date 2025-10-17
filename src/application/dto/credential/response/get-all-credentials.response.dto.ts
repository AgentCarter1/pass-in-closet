import { ApiProperty } from '@nestjs/swagger';

export class CredentialItemDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'Google Account',
  })
  public readonly name: string;

  @ApiProperty({
    example: 'https://accounts.google.com',
  })
  public readonly link: string;

  @ApiProperty({
    example: 'user@example.com',
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

  public constructor(props: Partial<CredentialItemDto> = {}) {
    this.id = props.id!;
    this.name = props.name!;
    this.link = props.link!;
    this.email = props.email!;
    this.credentialGroupId = props.credentialGroupId!;
    this.createdAt = props.createdAt!;
    this.updatedAt = props.updatedAt!;
  }
}

export class GetAllCredentialsResponseDto {
  @ApiProperty({
    type: [CredentialItemDto],
    example: [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Google Account',
        link: 'https://accounts.google.com',
        email: 'user@example.com',
        credentialGroupId: '550e8400-e29b-41d4-a716-446655440001',
        createdAt: '2023-12-01T10:00:00.000Z',
        updatedAt: '2023-12-01T10:00:00.000Z',
      },
    ],
  })
  public readonly credentials: CredentialItemDto[];

  @ApiProperty({
    example: 2,
  })
  public readonly count: number;

  public constructor(props: Partial<GetAllCredentialsResponseDto> = {}) {
    this.credentials = props.credentials!;
    this.count = props.count!;
  }
}
