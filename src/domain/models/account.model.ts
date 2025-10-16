export class AccountModel {
  public readonly id?: string;
  public readonly email: string | null;
  public readonly firstName: string | null;
  public readonly lastName: string | null;
  public readonly password: string | null;
  public readonly accessToken: string | null;
  public readonly refreshToken: string | null;
  public readonly verifiedAt: Date | null;
  public readonly createdAt: Date | null;
  public readonly updatedAt: Date | null;
  public readonly deletedAt: Date | null;

  constructor(props: Partial<AccountModel> = {}) {
    this.id = props.id;
    this.email = props.email ?? null;
    this.firstName = props.firstName ?? null;
    this.lastName = props.lastName ?? null;
    this.password = props.password ?? null;
    this.accessToken = props.accessToken ?? null;
    this.refreshToken = props.refreshToken ?? null;
    this.verifiedAt = props.verifiedAt ?? null;
    this.createdAt = props.createdAt ?? null;
    this.updatedAt = props.updatedAt ?? null;
    this.deletedAt = props.deletedAt ?? null;
  }
}
