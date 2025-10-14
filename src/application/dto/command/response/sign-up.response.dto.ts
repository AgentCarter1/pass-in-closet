export class SignUpResponseDto {
  public readonly status: boolean;

  public constructor(props: Partial<SignUpResponseDto> = {}) {
    this.status = props.status!;
  }
}
