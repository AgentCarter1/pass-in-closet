import { ApiProperty } from '@nestjs/swagger';

export class DeleteCredentialGroupResponseDto {
  @ApiProperty({
    example: true,
  })
  public readonly success: boolean;

  @ApiProperty({
    example: 'Credential group deleted successfully',
  })
  public readonly message: string;

  public constructor(props: Partial<DeleteCredentialGroupResponseDto> = {}) {
    this.success = props.success!;
    this.message = props.message!;
  }
}
