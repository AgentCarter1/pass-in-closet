import { ApiProperty } from '@nestjs/swagger';

export class CredentialGroupItemDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'My Credential Group',
  })
  public readonly name: string;

  @ApiProperty({
    example: '2023-12-01T10:00:00.000Z',
  })
  public readonly createdAt: Date;

  @ApiProperty({
    example: '2023-12-01T10:00:00.000Z',
  })
  public readonly updatedAt: Date;

  public constructor(props: Partial<CredentialGroupItemDto> = {}) {
    this.id = props.id!;
    this.name = props.name!;
    this.createdAt = props.createdAt!;
    this.updatedAt = props.updatedAt!;
  }
}

export class GetAllCredentialGroupsResponseDto {
  @ApiProperty({
    type: [CredentialGroupItemDto],
    example: [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'My Credential Group',
        createdAt: '2023-12-01T10:00:00.000Z',
        updatedAt: '2023-12-01T10:00:00.000Z',
      },
    ],
  })
  public readonly credentialGroups: CredentialGroupItemDto[];

  @ApiProperty({
    example: 2,
  })
  public readonly count: number;

  public constructor(props: Partial<GetAllCredentialGroupsResponseDto> = {}) {
    this.credentialGroups = props.credentialGroups!;
    this.count = props.count!;
  }
}
