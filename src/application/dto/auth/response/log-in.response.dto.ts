import { ApiProperty } from '@nestjs/swagger';

export class LogInResponseDto {
  @ApiProperty()
  public readonly accessToken: string;
  @ApiProperty()
  public readonly refreshToken: string;

  public constructor(props: Partial<LogInResponseDto> = {}) {
    this.accessToken = props.accessToken!;
    this.refreshToken = props.refreshToken!;
  }
}
