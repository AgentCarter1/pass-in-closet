import { ApiProperty } from '@nestjs/swagger';

export class DeleteCredentialResponseDto {
  @ApiProperty({
    example: true,
  })
  public readonly success: boolean;

  @ApiProperty({
    example: 'Credential deleted successfully',
  })
  public readonly message: string;

  public constructor(props: Partial<DeleteCredentialResponseDto> = {}) {
    this.success = props.success!;
    this.message = props.message!;
  }
}
