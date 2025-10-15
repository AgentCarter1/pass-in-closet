import { ApiProperty } from '@nestjs/swagger';

export class CreateCredentialGroupResponseDto {
  @ApiProperty({
    example: 'id',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'name',
  })
  public readonly name: string;

  public constructor(props: Partial<CreateCredentialGroupResponseDto> = {}) {
    this.id = props.id!;
    this.name = props.name!;
  }
}
