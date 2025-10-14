import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({
    example: true,
  })
  public readonly status: boolean;

  public constructor(props: Partial<SignUpResponseDto> = {}) {
    this.status = props.status!;
  }
}
