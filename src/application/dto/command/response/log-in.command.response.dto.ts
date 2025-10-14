export class LogInCommandResponseDto {
  public readonly accessToken: string;
  public readonly refreshToken: string;

  public constructor(props: Partial<LogInCommandResponseDto> = {}) {
    this.accessToken = props.accessToken!;
    this.refreshToken = props.refreshToken!;
  }
}
