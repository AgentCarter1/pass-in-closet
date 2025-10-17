import { ApiProperty } from '@nestjs/swagger';

export class UpdateCredentialGroupResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'Updated Group Name',
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

  public constructor(props: Partial<UpdateCredentialGroupResponseDto> = {}) {
    this.id = props.id!;
    this.name = props.name!;
    this.createdAt = props.createdAt!;
    this.updatedAt = props.updatedAt!;
  }
}
